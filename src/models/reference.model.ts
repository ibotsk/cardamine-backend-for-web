import {belongsTo, Entity, model, property} from '@loopback/repository';
import {Literature} from './literature.model';

@model({
  name: 'reference',
})
export class Reference extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
    hidden: true,
  })
  id?: number;

  @property({
    type: 'string',
    name: 'name_as_published',
  })
  nameAsPublished?: string;

  @property({
    type: 'number',
    name: 'id_standardised_name',
    hidden: true,
  })
  idStandardisedName?: number;
  @property({
    type: 'string',
  })
  note?: string;

  @property({
    type: 'string',
  })
  page?: string;

  @property({
    type: 'number',
    required: true,
    name: 'id_material',
    hidden: true,
  })
  idMaterial: number;

  @belongsTo(() => Literature, {name: 'literature'}, {
    name: 'id_literature',
    hidden: true,
  })
  idLiterature: number;

  constructor(data?: Partial<Reference>) {
    super(data);
  }
}

export interface ReferenceRelations {
  // describe navigational properties here
}

export type ReferenceWithRelations = Reference & ReferenceRelations;
