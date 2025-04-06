import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { Pokemon } from './pokemon.entity';

@Entity()
export class Profile {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToMany(() => Pokemon)
  @JoinTable({
    name: 'profile_pokemon',
    joinColumn: {
      name: 'profile_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'pokemon_id',
      referencedColumnName: 'id',
    },
  })
  pokemon: Pokemon[];
}
