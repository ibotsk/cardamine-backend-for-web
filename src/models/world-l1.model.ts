import {Entity, model, property} from '@loopback/repository';

@model({
  name: 'world_l1',
})
export class WorldL1 extends Entity {
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

  constructor(data?: Partial<WorldL1>) {
    super(data);
  }
}

export interface WorldL1Relations {
  // describe navigational properties here
}

export type WorldL1WithRelations = WorldL1 & WorldL1Relations;
