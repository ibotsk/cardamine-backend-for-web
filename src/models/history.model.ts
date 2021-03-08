import {belongsTo, Entity, model, property} from '@loopback/repository';
import {ListOfSpecies} from './list-of-species.model';

@model({
  name: 'history',
})
export class History extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'number',
    required: true,
    name: 'id_data',
    hidden: true,
  })
  idData: number;

  @property({
    type: 'string',
    name: 'revised_name',
  })
  revisedName?: string;
  @property({
    type: 'number',
    name: 'revised_by',
    hidden: true,
  })
  revisedBy?: number;

  @property({
    type: 'string',
    name: 'h_date',
  })
  hDate?: string;

  @belongsTo(() => ListOfSpecies, {name: 'listOfSpecies'}, {
    name: 'id_standardised_name',
    hidden: true,
  })
  idStandardisedName: number;

  constructor(data?: Partial<History>) {
    super(data);
  }
}

export interface HistoryRelations {
  // describe navigational properties here
}

export type HistoryWithRelations = History & HistoryRelations;
