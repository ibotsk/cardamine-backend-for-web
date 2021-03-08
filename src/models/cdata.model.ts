import {Entity, hasOne, model, property} from '@loopback/repository';
import {Dna} from './dna.model';
import {Material} from './material.model';

@model({
  name: 'cdata',
})
export class Cdata extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'string',
  })
  n?: string;

  @property({
    type: 'string',
  })
  dn?: string;

  @property({
    type: 'string',
  })
  x?: string;

  @property({
    type: 'number',
    name: 'counted_by',
  })
  counteById?: number;

  @property({
    type: 'string',
    name: 'counted_date',
  })
  countedDate?: string;

  @property({
    type: 'boolean',
    default: false,
  })
  drawing?: boolean;

  @property({
    type: 'boolean',
    default: false,
  })
  photo?: boolean;

  @property({
    type: 'boolean',
    default: false,
  })
  idiogram?: boolean;

  @property({
    type: 'string',
  })
  karyotype?: string;

  @property({
    type: 'string',
    name: 'ploidy_level',
  })
  ploidyLevel?: string;

  @property({
    type: 'number',
    name: 'number_of_analysed_plants',
  })
  numberOfAnalysedPlants?: number;

  @property({
    type: 'string',
    name: 'slide_no',
  })
  slideNo?: string;

  @property({
    type: 'string',
    name: 'deposited_in',
  })
  depositedIn?: string;

  @property({
    type: 'number',
    name: 'has_majovsky',
    hidden: true,
  })
  hasMajovsky?: number;

  @property({
    type: 'boolean',
    default: false,
    name: 'erroneous_record',
  })
  erroneousRecord?: boolean;

  @property({
    type: 'boolean',
    default: false,
    name: 'duplicate_data',
  })
  duplicateData?: boolean;

  @property({
    type: 'boolean',
    required: true,
    name: 'duplicate_data_prob',
    hidden: true,
  })
  duplicateDataProb: boolean;

  @property({
    type: 'boolean',
    default: false,
    name: 'hoc_loco',
  })
  hocLoco?: boolean;

  @property({
    type: 'string',
    name: 'ploidy_level_revised',
  })
  ploidyLevelRevised?: string;

  @property({
    type: 'string',
    name: 'count_credibility',
  })
  countCredibility?: string;

  @property({
    type: 'string',
    name: 'public_note',
  })
  publicNote?: string;

  @property({
    type: 'boolean',
    default: false,
    name: 'doubtful_record',
  })
  doubtfulRecord?: boolean;

  @property({
    type: 'string',
    name: 'x_revised',
  })
  xRevised?: string;

  @property({
    type: 'boolean',
    default: false,
    name: 'ambiguous_record',
  })
  ambiguousRecord?: boolean;

  @hasOne(() => Dna, {keyTo: 'idCdata'})
  dna: Dna;

  @hasOne(() => Material, {keyTo: 'idCdata'})
  material: Material;

  constructor(data?: Partial<Cdata>) {
    super(data);
  }
}

export interface CdataRelations {
  // describe navigational properties here
}

export type CdataWithRelations = Cdata & CdataRelations;
