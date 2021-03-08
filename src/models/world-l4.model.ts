import {belongsTo, Entity, model, property} from '@loopback/repository';
import {WorldL3} from './world-l3.model';

@model({
  name: 'world_l4',
})
export class WorldL4 extends Entity {
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

  @belongsTo(() => WorldL3, {name: 'worldL3'}, {
    name: 'id_parent',
    hidden: true,
  })
  idParent: number;

  constructor(data?: Partial<WorldL4>) {
    super(data);
  }
}

export interface WorldL4Relations {
  // describe navigational properties here
}

export type WorldL4WithRelations = WorldL4 & WorldL4Relations;
