import {Entity, model, property} from '@loopback/repository';

@model({
  name: 'dna',
})
export class Dna extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
    hidden: true,
  })
  id?: number;

  @property({
    type: 'string',
  })
  method?: string;

  @property({
    type: 'string',
  })
  ploidy?: string;

  @property({
    type: 'string',
    name: 'ch_count',
  })
  chCount?: string;

  @property({
    type: 'string',
    name: 'size_c',
  })
  sizeC?: string;

  @property({
    type: 'string',
    name: 'size_from',
  })
  sizeFrom?: string;

  @property({
    type: 'string',
    name: 'size_to',
  })
  sizeTo?: string;

  @property({
    type: 'string',
    name: 'size_units',
  })
  sizeUnits?: string;

  @property({
    type: 'string',
    name: 'plants_analysed',
  })
  plantsAnalysed?: string;

  @property({
    type: 'string',
    name: 'number_analyses',
  })
  numberOfAnalyses?: string;

  @property({
    type: 'string',
    name: 'ploidy_revised',
  })
  ploidyRevised?: string;

  @property({
    type: 'number',
    name: 'id_cdata',
  })
  idCdata?: number;

  constructor(data?: Partial<Dna>) {
    super(data);
  }
}

export interface DnaRelations {
  // describe navigational properties here
}

export type DnaWithRelations = Dna & DnaRelations;
