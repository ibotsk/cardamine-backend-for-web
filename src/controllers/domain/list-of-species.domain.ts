import {ListOfSpecies} from '../../models';

export interface ListOfSpeciesForRelationsResponse {
  basionymFor: ListOfSpecies[];
  nomenNovumFor: ListOfSpecies[];
  replacedFor: ListOfSpecies[];
}
