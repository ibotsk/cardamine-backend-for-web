import {belongsTo, Entity, hasMany, model, property} from '@loopback/repository';
import {Synonyms} from './synonyms.model';

@model({
  name: 'list_of_species',
})
export class ListOfSpecies extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
    defaultOrder: 15,
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
    defaultOrder: 1,
  })
  genus?: string;

  @property({
    type: 'string',
    defaultOrder: 2,
  })
  species?: string;

  @property({
    type: 'string',
    defaultOrder: 3,
  })
  subsp?: string;

  @property({
    type: 'string',
    defaultOrder: 4,
  })
  var?: string;

  @property({
    type: 'string',
    defaultOrder: 5,
  })
  subvar?: string;

  @property({
    type: 'string',
    defaultOrder: 6,
  })
  forma?: string;

  @property({
    type: 'string',
    defaultOrder: 7,
  })
  authors?: string;

  @property({
    type: 'string',
    name: 'genus_h',
    defaultOrder: 8,
  })
  genusH?: string;

  @property({
    type: 'string',
    name: 'species_h',
    defaultOrder: 9,
  })
  speciesH?: string;

  @property({
    type: 'string',
    name: 'subsp_h',
    defaultOrder: 10,
  })
  subspH?: string;

  @property({
    type: 'string',
    name: 'var_h',
    defaultOrder: 11,
  })
  varH?: string;

  @property({
    type: 'string',
    name: 'subvar_h',
    defaultOrder: 12,
  })
  subvarH?: string;

  @property({
    type: 'string',
    name: 'forma_h',
    defaultOrder: 13,
  })
  formaH?: string;

  @property({
    type: 'string',
    name: 'authors_h',
    defaultOrder: 14,
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
    required: true,
    name: 'ntype_order',
  })
  ntypeOrder: number;

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

  @belongsTo(() => ListOfSpecies, {name: 'accepted'}, {
    name: 'id_accepted_name',
    hidden: true,
  })
  idAcceptedName: number;

  @belongsTo(() => ListOfSpecies, {name: 'basionym'}, {
    name: 'id_basionym',
    hidden: true,
  })
  idBasionym: number;

  @belongsTo(() => ListOfSpecies, {name: 'replaced'}, {
    name: 'id_replaced',
    hidden: true,
  })
  idReplaced: number;

  @belongsTo(() => ListOfSpecies, {name: 'nomenNovum'}, {
    name: 'id_nomen_novum',
    hidden: true,
  })
  idNomenNovum: number;

  @hasMany(() => ListOfSpecies, {keyTo: 'idBasionym'})
  basionymFor: ListOfSpecies[];

  @hasMany(() => ListOfSpecies, {keyTo: 'idReplaced'})
  replacedFor: ListOfSpecies[];

  @hasMany(() => ListOfSpecies, {keyTo: 'idNomenNovum'})
  nomenNovumFor: ListOfSpecies[];

  @hasMany(() => Synonyms, {keyTo: 'idParent'})
  synonyms: Synonyms[];

  @hasMany(() => ListOfSpecies, {
    through: {
      model: () => Synonyms,
      keyFrom: 'idParent',
      keyTo: 'idSynonym',
    }
  })
  subsynonymsNomenclatoric: ListOfSpecies[];

  constructor(data?: Partial<ListOfSpecies>) {
    super(data);
  }
}

export interface ListOfSpeciesRelations {
  // describe navigational properties here
}

export type ListOfSpeciesWithRelations = ListOfSpecies & ListOfSpeciesRelations;
