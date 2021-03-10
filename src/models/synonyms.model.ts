import {belongsTo, Entity, model, property} from '@loopback/repository';
import {ListOfSpecies} from './list-of-species.model';

@model({
  name: 'synonyms',
})
export class Synonyms extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
    hidden: true,
  })
  id?: string;

  @property({
    type: 'number',
    required: true,
    name: 'id_parent',
    hidden: true,
  })
  idParent: number;
  @property({
    type: 'number',
    required: true,
  })
  syntype: number;

  @property({
    type: 'number',
    hidden: true,
  })
  rorder?: number;

  @property({
    type: 'string',
    name: 'misidentification_author',
  })
  misidentificationAuthor?: string;

  @belongsTo(() => ListOfSpecies, {name: 'name'}, {
    name: 'id_synonym',
    hidden: true,
  })
  idSynonym: number;

  constructor(data?: Partial<Synonyms>) {
    super(data);
  }
}

export interface SynonymsRelations {
  // describe navigational properties here
}

export type SynonymsWithRelations = Synonyms & SynonymsRelations;
