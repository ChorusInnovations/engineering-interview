import { Module } from '@nestjs/common';
import { DbModule } from '../database/db.module';
import { PokemonModule } from './features/pokemon/pokemon.module';
import { ProfileModule } from './features/profile/profile.module';

@Module({
  imports: [DbModule, PokemonModule, ProfileModule],
})
export class AppModule {}
