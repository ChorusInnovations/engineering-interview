import styled from '@emotion/styled';
import { PokemonList } from '@pokemon-ui/pokemon-team-builder';

const StyledApp = styled.div`
  font-family: 'Arial', sans-serif;
`;

export function App() {
  return (
    <StyledApp>
      <PokemonList />
    </StyledApp>
  );
}

export default App;