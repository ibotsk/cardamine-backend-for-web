import {Entity, model, property} from '@loopback/repository';

@model({
  name: 'world_l2',
})
export class WorldL2 extends Entity {
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

  constructor(data?: Partial<WorldL2>) {
    super(data);
  }
}

export interface WorldL2Relations {
  // describe navigational properties here
}

export type WorldL2WithRelations = WorldL2 & WorldL2Relations;
