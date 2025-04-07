export interface Pokemon {
  id: number;
  name: string;
  pokedexNumber: number;
  imageUrl: string;
  types: string[];
  hp: number;
  attack: number;
  defense: number;
  speed: number;
}

export interface Profile {
  id: number;
  name: string;
  pokemon: Pokemon[];
}
