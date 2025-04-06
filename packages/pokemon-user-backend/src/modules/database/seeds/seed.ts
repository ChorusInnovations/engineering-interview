import { seedPokemons } from './pokemon.seed';
import DataSource from '../db-config.service';

async function main() {
  try {
    await DataSource.initialize();
    await seedPokemons(DataSource);
    console.log('Seeding completed successfully');
  } catch (error) {
    console.error('Error during seeding:', error);
  } finally {
    if (DataSource.isInitialized) {
      await DataSource.destroy();
    }
  }
}

main();
