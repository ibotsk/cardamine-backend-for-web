import {Entity, model, property} from '@loopback/repository';

@model({
  name: 'persons',
})
export class Persons extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'string',
    name: 'pers_name',
  })
  persName?: string;

  constructor(data?: Partial<Persons>) {
    super(data);
  }
}

export interface PersonsRelations {
  // describe navigational properties here
}

export type PersonsWithRelations = Persons & PersonsRelations;
