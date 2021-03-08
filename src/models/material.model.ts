import {belongsTo, Entity, hasOne, model, property} from '@loopback/repository';
import {Persons} from './persons.model';
import {Reference} from './reference.model';
import {WorldL4} from './world-l4.model';

@model({
  name: 'material',
})
export class Material extends Entity {
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
  country?: string;

  @property({
    type: 'string',
    name: 'geographical_district',
  })
  geographicalDistrict?: string;

  @property({
    type: 'number',
    name: 'phytogeographical_district',
  })
  phytogeographicalDistrict?: number;

  @property({
    type: 'string',
    name: 'central_european_mapping_unit',
  })
  centralEuropeanMappingUnit?: string;

  @property({
    type: 'string',
    name: 'closest_village_town',
  })
  closestVillageTown?: string;

  @property({
    type: 'string',
  })
  altitude?: string;

  @property({
    type: 'string',
  })
  exposition?: string;

  @property({
    type: 'string',
  })
  description?: string;

  @property({
    type: 'string',
    name: 'collected_date',
  })
  collectedDate?: string;

  @property({
    type: 'string',
    name: 'voucher_specimen_no',
  })
  voucherSpecimenNo?: string;

  @property({
    type: 'string',
    name: 'deposited_in',
  })
  depositedIn?: string;

  @property({
    type: 'string',
    name: 'coordinates_lat',
  })
  coordinatesLat?: string;

  @property({
    type: 'string',
    name: 'coordinates_lon',
  })
  coordinatesLon?: string;

  @property({
    type: 'string',
    name: 'administrative_unit',
  })
  administrativeUnit?: string;

  @property({
    type: 'number',
    name: 'id_cdata',
    hidden: true,
  })
  idCdata?: number;

  @property({
    type: 'string',
    name: 'coordinates_georef',
  })
  coordinatesGeoref?: string;

  @property({
    type: 'string',
    name: 'coordinates_for_map',
  })
  coordinatesForMap?: string;

  @hasOne(() => Reference, {keyTo: 'idMaterial'})
  reference: Reference;

  @belongsTo(() => Persons, {name: 'collectedBy'}, {
    name: 'collected_by',
    hidden: true,
  })
  collectedById: number;

  @belongsTo(() => Persons, {name: 'identifiedBy'}, {
    name: 'identified_by',
    hidden: true,
  })
  identifiedById: number;

  @belongsTo(() => WorldL4, {name: 'worldL4'}, {
    name: 'id_world_4',
    hidden: true,
  })
  idWorld4: number;

  constructor(data?: Partial<Material>) {
    super(data);
  }
}

export interface MaterialRelations {
  // describe navigational properties here
}

export type MaterialWithRelations = Material & MaterialRelations;
