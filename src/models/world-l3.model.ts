import {belongsTo, Entity, model, property} from '@loopback/repository';
import {WorldL2} from './world-l2.model';

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

  @belongsTo(() => WorldL2, {name: 'worldL2'}, {
    name: 'id_parent',
    hidden: true,
  })
  idParent: number;

  constructor(data?: Partial<WorldL3>) {
    super(data);
  }
}

export interface WorldL3Relations {
  // describe navigational properties here
}

export type WorldL3WithRelations = WorldL3 & WorldL3Relations;
