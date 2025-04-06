import { Injectable } from '@nestjs/common';
import { Pokemon } from '../../../database/entities/pokemon.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class PokemonService {
  constructor(
    @InjectRepository(Pokemon)
    private pokemonRepository: Repository<Pokemon>
  ) {}

  async findAll(): Promise<Pokemon[]> {
    return this.pokemonRepository.find({
      order: {
        pokedexNumber: 'ASC',
      },
    });
  }
}
