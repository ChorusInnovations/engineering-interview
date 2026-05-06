import { defineEntity, p } from '@mikro-orm/core';

export const SomeEntity = defineEntity({
  name: 'SomeEntity',
  properties: {
    id: p.uuid().primary(),
    someCol: p.string(),
  },
});

export type SomeEntity = typeof SomeEntity extends { prototype: infer T } ? T : never;
