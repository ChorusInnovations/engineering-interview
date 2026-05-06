import { Entity, PrimaryKey, Property } from '@mikro-orm/core';

@Entity()
export class SomeEntity {
  @PrimaryKey({ type: 'uuid' })
  id: string = crypto.randomUUID();

  @Property()
  someCol!: string;
}
