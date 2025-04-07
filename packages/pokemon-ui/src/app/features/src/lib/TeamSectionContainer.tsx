import styled from "@emotion/styled";
import { Profile } from "./types";

const TeamSection = styled.div`
  margin-bottom: 30px;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
`;

const TeamTitle = styled.h2`
  font-size: 1.3rem;
  margin-bottom: 15px;
`;

const TeamGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 15px;
`;

const TeamSlot = styled.div<{ isEmpty: boolean }>`
  height: 150px;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: ${props => props.isEmpty ? '#eee' : 'white'};
  border: 2px dashed ${props => props.isEmpty ? '#ccc' : 'transparent'};
  padding: 10px;
`;

const EmptySlotText = styled.div`
  color: #999;
  font-size: 0.9rem;
  text-align: center;
`;

const RemoveButton = styled.button`
  margin-top: 5px;
  padding: 3px 8px;
  background-color: #f44336;
  color: white;
  border: none;
  border-radius: 3px;
  font-size: 0.8rem;
  cursor: pointer;
  
  &:hover {
    background-color: #d32f2f;
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

type Props = {
  selectedProfile: Profile,
  handleTogglePokemon: (pokemonId: number) => void
}

export default function TeamSectionContainer({
  selectedProfile,
  handleTogglePokemon
}: Props) {
  return (
    <TeamSection>
      <TeamTitle>Team for {selectedProfile.name}:</TeamTitle>
      <TeamGrid>
        {selectedProfile.pokemon?.map(pokemon => (
          <TeamSlot key={pokemon.id} isEmpty={false}>
            <PokemonImage 
              src={pokemon.imageUrl} 
              alt={pokemon.name} 
              style={{ width: '80px', height: '80px' }}
            />
            <PokemonName style={{ fontSize: '1rem' }}>{pokemon.name}</PokemonName>
            <RemoveButton onClick={() => handleTogglePokemon(pokemon.id)}>
              Remove
            </RemoveButton>
          </TeamSlot>
        ))}
        
        {Array.from({ length: 6 - selectedProfile.pokemon?.length || 0 }).map((_, i) => (
          <TeamSlot key={`empty-${i}`} isEmpty={true}>
            <EmptySlotText>Empty Slot</EmptySlotText>
          </TeamSlot>
        ))}
      </TeamGrid>
    </TeamSection>
  )
}