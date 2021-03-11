import {ListOfSpecies} from '../../models';

export interface ListOfSpeciesSearchRequest {
  genus?: string;
  species?: string;
  infraspecific?: string;
  status?: string[];
  authors?: string;
  page?: number;
  rowsPerPage?: number;
}

export interface ListOfSpeciesSearchResponse {
  data: ListOfSpecies[];
  totalRecords: number;
  pagination: {
    page?: number,
    rowsPerPage?: number,
    totalPages: number,
  };
}

export interface ListOfSpeciesForRelationsResponse {
  basionymFor: ListOfSpecies[];
  nomenNovumFor: ListOfSpecies[];
  replacedFor: ListOfSpecies[];
}
