import {belongsTo, Entity, model, property} from '@loopback/repository';
import {WorldL1} from './world-l1.model';

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

  @belongsTo(() => WorldL1, {name: 'worldL1'}, {
    name: 'id_parent',
    hidden: true,
  })
  idParent: number;

  constructor(data?: Partial<WorldL2>) {
    super(data);
  }
}

export interface WorldL2Relations {
  // describe navigational properties here
}

export type WorldL2WithRelations = WorldL2 & WorldL2Relations;
