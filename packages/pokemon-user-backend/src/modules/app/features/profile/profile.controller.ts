import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ProfileService } from './profile.service';
import { Profile } from '../../../database/entities/profile.entity';

@Controller('profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Get()
  async findAll(): Promise<Profile[]> {
    return this.profileService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Profile> {
    return this.profileService.findOne(id);
  }

  @Post()
  async create(@Body() data: { name: string }): Promise<Profile> {
    return this.profileService.create(data.name);
  }

  @Put(':id/pokemon')
  async updatePokemon(
    @Param('id') id: number,
    @Body() data: { pokemonIds: number[] }
  ): Promise<Profile> {
    return this.profileService.updatePokemon(id, data.pokemonIds);
  }

  @Post(':id/pokemon/bulk')
  async addMultiplePokemon(
    @Param('id') id: number,
    @Body() data: { pokemonIds: number[] }
  ): Promise<Profile> {
    return this.profileService.addMultiplePokemon(id, data.pokemonIds);
  }

  @Delete(':id/pokemon/bulk')
  async removeMultiplePokemon(
    @Param('id') id: number,
    @Body() data: { pokemonIds: number[] }
  ): Promise<Profile> {
    return this.profileService.removeMultiplePokemon(id, data.pokemonIds);
  }
}
