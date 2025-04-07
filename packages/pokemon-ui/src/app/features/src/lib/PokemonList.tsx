import { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import styled from '@emotion/styled';
import ProfileContainer from './ProfileContainer';
import { Pokemon, Profile } from './types';
import TeamSectionContainer from './TeamSectionContainer';
import PokemonGridContainer from './PokemonGridContainer';

const Header = styled.div`
  margin-bottom: 30px;
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
`;

const Title = styled.h1`
  font-size: 2rem;
  text-align: center;
  margin-bottom: 30px;
`;

const LoadMoreButton = styled.button`
  display: block;
  margin: 30px auto 0;
  padding: 10px 20px;
  background-color: #4a90e2;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #3578c7;
  }

  &:disabled {
    background-color: #cccccc;
    cursor: not-allowed;
  }
`;

export function PokemonList() {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [selectedProfileId, setSelectedProfileId] = useState<number | null>(
    null
  );
  const [displayCount, setDisplayCount] = useState(10);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadMoreButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const [pokemonResponse, profilesResponse] = await Promise.all([
          axios.get('http://localhost:3000/api/pokemon'),
          axios.get('http://localhost:3000/api/profiles'),
        ]);

        setPokemons(pokemonResponse.data);
        setProfiles(profilesResponse.data);

        if (profilesResponse.data.length > 0) {
          setSelectedProfileId(profilesResponse.data[0].id);
        }

        setLoading(false);
      } catch (err) {
        setError('Failed to load data. Please try again later.');
        setLoading(false);
        console.error('Error fetching data:', err);
      }
    }

    fetchData();
  }, []);

  useEffect(() => {
    if (displayCount > 10) {
      setTimeout(() => {
        loadMoreButtonRef.current?.scrollIntoView({
          behavior: 'smooth',
          block: 'center',
        });
      }, 100);
    }
  }, [displayCount]);

  const handleLoadMore = () => {
    setDisplayCount((prev) => Math.min(prev + 10, pokemons.length));
  };

  const handleTogglePokemon = async (pokemonId: number) => {
    if (!selectedProfileId) return;

    const selectedProfile = profiles.find((p) => p.id === selectedProfileId);
    if (!selectedProfile) return;

    const isSelected = selectedProfile.pokemon.some((p) => p.id === pokemonId);
    const updatedPokemonIds = isSelected
      ? selectedProfile.pokemon
          .filter((p) => p.id !== pokemonId)
          .map((p) => p.id)
      : [...selectedProfile.pokemon.map((p) => p.id), pokemonId];

    if (!isSelected && updatedPokemonIds.length > 6) {
      alert('A team can have a maximum of 6 Pokémon');
      return;
    }

    try {
      const response = await axios.put(
        `http://localhost:3000/api/profiles/${selectedProfileId}/pokemon`,
        {
          pokemonIds: updatedPokemonIds,
        }
      );

      setProfiles(
        profiles.map((p) => (p.id === selectedProfileId ? response.data : p))
      );
    } catch (err) {
      console.error('Error updating team:', err);
      alert('Failed to update team');
    }
  };

  if (loading) {
    return (
      <Container>
        <div>Loading...</div>
      </Container>
    );
  }

  if (error) {
    return (
      <Container>
        <div>Error: {error}</div>
      </Container>
    );
  }

  const selectedProfile = selectedProfileId
    ? profiles.find((p) => p.id === selectedProfileId)
    : null;

  const selectedPokemonIds = selectedProfile
    ? selectedProfile.pokemon?.map((p) => p.id) || []
    : [];

  const displayedPokemons = pokemons.slice(0, displayCount);
  const hasMore = displayCount < pokemons.length;

  return (
    <Container>
      <Title>Pokémon Team Builder</Title>
      <Header>
        <ProfileContainer
          profiles={profiles}
          setProfiles={setProfiles}
          selectedProfileId={selectedProfileId}
          setSelectedProfileId={setSelectedProfileId}
        />
        {selectedProfile && (
          <TeamSectionContainer
            selectedProfile={selectedProfile}
            handleTogglePokemon={handleTogglePokemon}
          />
        )}
      </Header>

      <h2>Available Pokémon</h2>
      <PokemonGridContainer
        displayedPokemons={displayedPokemons}
        handleTogglePokemon={handleTogglePokemon}
        selectedPokemonIds={selectedPokemonIds}
      />

      {hasMore && (
        <LoadMoreButton ref={loadMoreButtonRef} onClick={handleLoadMore}>
          Load More Pokémon
        </LoadMoreButton>
      )}
    </Container>
  );
}
