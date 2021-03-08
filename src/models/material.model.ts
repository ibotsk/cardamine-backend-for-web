import {Entity, hasOne, model, property} from '@loopback/repository';
import {Reference} from './reference.model';

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
    type: 'number',
    name: 'collected_by',
    hidden: true,
  })
  collectedById?: number;

  @property({
    type: 'string',
    name: 'collected_date',
  })
  collectedDate?: string;

  @property({
    type: 'number',
    name: 'identified_by',
  })
  identifiedById?: number;

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
    type: 'number',
    name: 'id_world_4',
    hidden: true,
  })
  idWorld4?: number;

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

  constructor(data?: Partial<Material>) {
    super(data);
  }
}

export interface MaterialRelations {
  // describe navigational properties here
}

export type MaterialWithRelations = Material & MaterialRelations;
