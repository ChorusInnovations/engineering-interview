import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Pokemon {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  pokedexNumber: number;

  @Column({ nullable: true })
  imageUrl?: string;

  // Base stats that every Pokémon has
  @Column()
  hp: number; // Health Points - how much damage they can take

  @Column()
  attack: number; // Physical attack strength

  @Column()
  defense: number; // Physical defense strength

  @Column()
  specialAttack: number; // Special attack strength (like fire, water attacks)

  @Column()
  specialDefense: number; // Special defense strength

  @Column()
  speed: number; // Determines who attacks first in battle

  // Type information (Pokémon can be Fire, Water, Grass, etc.)
  @Column('text', { array: true })
  types: string[]; // Can have up to 2 types (e.g., ['fire', 'flying'])

  @Column()
  height: number; // Height in decimeters

  @Column()
  weight: number; // Weight in hectograms
}
