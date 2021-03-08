import {Entity, model, property} from '@loopback/repository';

@model({
  name: 'list_of_species',
})
export class ListOfSpecies extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'string',
    required: true,
  })
  ntype: string;

  @property({
    type: 'boolean',
    required: true,
  })
  hybrid: boolean;

  @property({
    type: 'string',
  })
  genus?: string;

  @property({
    type: 'string',
  })
  species?: string;

  @property({
    type: 'string',
  })
  subsp?: string;

  @property({
    type: 'string',
  })
  var?: string;

  @property({
    type: 'string',
  })
  subvar?: string;

  @property({
    type: 'string',
  })
  forma?: string;

  @property({
    type: 'string',
  })
  authors?: string;

  @property({
    type: 'string',
    name: 'genus_h',
  })
  genusH?: string;

  @property({
    type: 'string',
    name: 'species_h',
  })
  speciesH?: string;

  @property({
    type: 'string',
    name: 'subsp_h',
  })
  subspH?: string;

  @property({
    type: 'string',
    name: 'var_h',
  })
  varH?: string;

  @property({
    type: 'string',
    name: 'subvar_h',
  })
  subvarH?: string;

  @property({
    type: 'string',
    name: 'forma_h',
  })
  formaH?: string;

  @property({
    type: 'string',
    name: 'authors_h',
  })
  authorsH?: string;

  @property({
    type: 'string',
  })
  publication?: string;

  @property({
    type: 'string',
  })
  proles?: string;

  @property({
    type: 'string',
  })
  unranked?: string;

  @property({
    type: 'string',
  })
  tribus?: string;

  @property({
    type: 'number',
    name: 'id_accepted_name',
    hidden: true,
  })
  idAcceptedName?: number;

  @property({
    type: 'number',
    required: true,
    name: 'ntype_order',
  })
  ntypeOrder: number;

  @property({
    type: 'number',
    name: 'id_basionym',
    hidden: true,
  })
  idBasionym?: number;

  @property({
    type: 'number',
    name: 'id_nomen_novum',
    hidden: true,
  })
  idNomenNovum?: number;

  @property({
    type: 'number',
    name: 'id_replaced',
    hidden: true,
  })
  idReplaced?: number;

  @property({
    type: 'string',
  })
  typification?: string;

  @property({
    type: 'string',
    name: 'type_locality',
  })
  typeLocality?: string;

  @property({
    type: 'string',
    name: 'reference_to_type_designation',
  })
  referenceToTypeDesignation?: string;

  @property({
    type: 'string',
    name: 'ind_loc',
  })
  indLoc?: string;

  constructor(data?: Partial<ListOfSpecies>) {
    super(data);
  }
}

export interface ListOfSpeciesRelations {
  // describe navigational properties here
}

export type ListOfSpeciesWithRelations = ListOfSpecies & ListOfSpeciesRelations;
