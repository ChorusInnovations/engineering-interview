import axios from 'axios';
import { DataSource } from 'typeorm';
import { Pokemon } from '../entities/pokemon.entity';

export async function seedPokemons(dataSource: DataSource) {
  const pokemonRepository = dataSource.getRepository(Pokemon);

  // Check if we already have Pokémon in the database
  const count = await pokemonRepository.count();
  if (count > 0) {
    console.log('Pokémon already seeded');
    return;
  }

  console.log('Seeding Pokémon...');

  // Fetch first 150 Pokémon
  const pokemons: Pokemon[] = [];

  for (let i = 1; i <= 150; i++) {
    try {
      const response = await axios.get(
        `https://pokeapi.co/api/v2/pokemon/${i}`
      );
      const pokemon = new Pokemon();

      // Basic info
      pokemon.name = response.data.name;
      pokemon.pokedexNumber = i;
      pokemon.imageUrl = response.data.sprites.front_default;

      // Stats
      pokemon.hp = response.data.stats.find(
        (stat) => stat.stat.name === 'hp'
      ).base_stat;
      pokemon.attack = response.data.stats.find(
        (stat) => stat.stat.name === 'attack'
      ).base_stat;
      pokemon.defense = response.data.stats.find(
        (stat) => stat.stat.name === 'defense'
      ).base_stat;
      pokemon.specialAttack = response.data.stats.find(
        (stat) => stat.stat.name === 'special-attack'
      ).base_stat;
      pokemon.specialDefense = response.data.stats.find(
        (stat) => stat.stat.name === 'special-defense'
      ).base_stat;
      pokemon.speed = response.data.stats.find(
        (stat) => stat.stat.name === 'speed'
      ).base_stat;

      // Physical attributes
      pokemon.height = response.data.height;
      pokemon.weight = response.data.weight;

      // Types
      pokemon.types = response.data.types.map((type) => type.type.name);

      pokemons.push(pokemon);
      console.log(`Processed ${pokemon.name} (#${i})`);
    } catch (error) {
      console.error(`Failed to fetch Pokémon #${i}:`, error);
    }
  }

  // Save all Pokémon to database
  await pokemonRepository.save(pokemons);
  console.log('Successfully seeded 150 Pokémon');
}
