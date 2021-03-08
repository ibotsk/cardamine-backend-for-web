import {Entity, model, property} from '@loopback/repository';

@model({
  name: 'world_l3',
})
export class WorldL3 extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'string',
  })
  description?: string;

  constructor(data?: Partial<WorldL3>) {
    super(data);
  }
}

export interface WorldL3Relations {
  // describe navigational properties here
}

export type WorldL3WithRelations = WorldL3 & WorldL3Relations;
