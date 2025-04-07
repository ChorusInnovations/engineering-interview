import styled from '@emotion/styled';
import { Pokemon } from './types';

const PokemonGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr); // 5 columns per row
  gap: 20px;
`;

const PokemonCard = styled.div`
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 15px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
  }
`;

const PokemonImage = styled.img`
  width: 120px;
  height: 120px;
  display: block;
  margin: 0 auto;
`;

const PokemonName = styled.h2`
  font-size: 1.2rem;
  text-align: center;
  margin: 10px 0;
  text-transform: capitalize;
`;

const PokemonNumber = styled.div`
  text-align: center;
  color: #666;
  font-size: 0.9rem;
  margin-bottom: 10px;
`;

const TypesContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 8px;
  margin-bottom: 10px;
`;

const TypeBadge = styled.span`
  padding: 4px 8px;
  border-radius: 16px;
  font-size: 0.8rem;
  text-transform: capitalize;
  background-color: #f0f0f0;
`;

const StatsContainer = styled.div`
  font-size: 0.8rem;
  color: #333;
  text-align: center;
`;

type Props = {
  displayedPokemons: Pokemon[];
  selectedPokemonIds: number[];
  handleTogglePokemon: (pokemonId: number) => void;
};

export default function PokemonGridContainer({
  displayedPokemons,
  selectedPokemonIds,
  handleTogglePokemon,
}: Props) {
  return (
    <PokemonGrid>
      {displayedPokemons.map((pokemon) => (
        <PokemonCard
          key={pokemon.id}
          onClick={() => handleTogglePokemon(pokemon.id)}
          style={{
            cursor: 'pointer',
            border: selectedPokemonIds.includes(pokemon.id)
              ? '2px solid #4a90e2'
              : '1px solid #ddd',
          }}
        >
          <PokemonImage src={pokemon.imageUrl} alt={pokemon.name} />
          <PokemonName>{pokemon.name}</PokemonName>
          <PokemonNumber>#{pokemon.pokedexNumber}</PokemonNumber>
          <TypesContainer>
            {pokemon.types.map((type) => (
              <TypeBadge key={type}>{type}</TypeBadge>
            ))}
          </TypesContainer>
          <StatsContainer>
            <div>
              HP: {pokemon.hp} | ATK: {pokemon.attack}
            </div>
            <div>
              DEF: {pokemon.defense} | SPD: {pokemon.speed}
            </div>
          </StatsContainer>
        </PokemonCard>
      ))}
    </PokemonGrid>
  );
}
