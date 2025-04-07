import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Profile } from '../../../database/entities/profile.entity';
import { Pokemon } from '../../../database/entities/pokemon.entity';

@Injectable()
export class ProfileService {
  constructor(
    @InjectRepository(Profile)
    private profileRepository: Repository<Profile>,
    @InjectRepository(Pokemon)
    private pokemonRepository: Repository<Pokemon>
  ) {}

  async findAll(): Promise<Profile[]> {
    return this.profileRepository.find({
      relations: ['pokemon'],
    });
  }

  async findOne(id: number): Promise<Profile> {
    const profile = await this.profileRepository.findOne({
      where: { id },
      relations: ['pokemon'],
    });

    if (!profile) {
      throw new NotFoundException(`Profile with ID ${id} not found`);
    }

    return profile;
  }

  async create(name: string): Promise<Profile> {
    const profile = this.profileRepository.create({ name });
    return this.profileRepository.save(profile);
  }

  async updatePokemon(id: number, pokemonIds: number[]): Promise<Profile> {
    // Ensure we don't exceed 6 Pokémon
    if (pokemonIds.length > 6) {
      throw new Error('A profile cannot have more than 6 Pokémon');
    }

    const profile = await this.findOne(id);

    if (pokemonIds.length === 0) {
      // If no Pokémon IDs provided, clear the team
      profile.pokemon = [];
    } else {
      // Find the Pokémon by IDs
      const pokemon = await this.pokemonRepository.findByIds(pokemonIds);
      profile.pokemon = pokemon;
    }

    return this.profileRepository.save(profile);
  }
}
