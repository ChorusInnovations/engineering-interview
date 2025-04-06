import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Profile } from '../../../database/entities/profile.entity';
import { Pokemon } from '../../../database/entities/pokemon.entity';
import { ProfileController } from './profile.controller';
import { ProfileService } from './profile.service';

@Module({
  imports: [TypeOrmModule.forFeature([Profile, Pokemon])],
  controllers: [ProfileController],
  providers: [ProfileService],
})
export class ProfileModule {}
