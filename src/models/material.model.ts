/* eslint-disable @typescript-eslint/no-explicit-any */
import {belongsTo, Entity, hasOne, model, property} from '@loopback/repository';
import wkx from 'wkx';
import {Persons} from './persons.model';
import {Reference} from './reference.model';
import {WorldL4} from './world-l4.model';

interface Coordinate {
  lat: number;
  lon: number;
}

interface Coordinates {
  type: string;
  coordinates: Coordinate;
}

const geogHexToJSON = (hexCoord?: string): Coordinates | null => {
  if (!hexCoord) {
    return null;
  }
  const wkbBuffer = Buffer.from(hexCoord, 'hex');
  const geom = wkx.Geometry.parse(wkbBuffer);

  const geoJSONObject = geom.toGeoJSON() as any;

  return {
    type: geoJSONObject.type,
    coordinates: {
      lat: geoJSONObject.coordinates[1],
      lon: geoJSONObject.coordinates[0],
    },
  };
};

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
    hidden: true,
  })
  coordinatesGeorefRaw?: string;

  @property({
    type: 'string',
    name: 'coordinates_for_map',
    hidden: true,
  })
  coordinatesForMapRaw?: string;

  @property({
    type: 'string',
    name: 'coordinates_georef',
  })
  get coordinatesGeoref(): Coordinates | null {
    return geogHexToJSON(this.coordinatesGeorefRaw);
  };

  @property({
    type: 'string',
    name: 'coordinates_for_map',
  })
  // coordinatesForMap?: string;
  get coordinatesForMap(): Coordinates | null {
    return geogHexToJSON(this.coordinatesForMapRaw);
  };

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
    if (data) {
      delete (data as any).coordinatesGeoref;
      delete (data as any).coordinatesForMap;
    }
    super(data);
  }
}

export interface MaterialRelations {
  // describe navigational properties here
}

export type MaterialWithRelations = Material & MaterialRelations;
