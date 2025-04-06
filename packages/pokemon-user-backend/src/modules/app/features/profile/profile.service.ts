import { In, Repository } from 'typeorm';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
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
    const pokemon = await this.pokemonRepository.findBy({
      id: In(pokemonIds),
    });

    profile.pokemon = pokemon;
    return this.profileRepository.save(profile);
  }

  async addMultiplePokemon(id: number, pokemonIds: number[]): Promise<Profile> {
    const profile = await this.findOne(id);

    // Get current Pokémon IDs in the team
    const currentIds = profile.pokemon.map((p) => p.id);

    // Filter out Pokémon IDs that are already in the team
    const newIds = pokemonIds.filter((id) => !currentIds.includes(id));

    // Check if adding these would exceed the limit of 6
    if (profile.pokemon.length + newIds.length > 6) {
      throw new Error('A profile cannot have more than 6 Pokémon');
    }

    // If no new Pokémon to add, return the profile
    if (newIds.length === 0) {
      return profile;
    }

    // Find the Pokémon to add
    const newPokemon = await this.pokemonRepository.findBy({
      id: In(newIds),
    });

    // Add them to the team
    profile.pokemon = [...profile.pokemon, ...newPokemon];

    return this.profileRepository.save(profile);
  }

  async removeMultiplePokemon(
    id: number,
    pokemonIds: number[]
  ): Promise<Profile> {
    const profile = await this.findOne(id);

    // Remove the specified Pokémon
    profile.pokemon = profile.pokemon.filter((p) => !pokemonIds.includes(p.id));

    return this.profileRepository.save(profile);
  }
}
