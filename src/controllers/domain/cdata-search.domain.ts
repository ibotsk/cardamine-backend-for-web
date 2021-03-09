export enum CdataSearchType {
  ORIGINAL = 'original',
  LATEST_REVISION = 'latestRevision',
  ACCEPTED = 'accepted',
}

export interface CdataSearchRequest {
  n?: string;
  dn?: string;
  xRevised?: string;
  ploidyLevelRevised?: string;
  publicationAuthor?: string;
  analysisAuthor?: string;
  worldL1?: string;
  worldL2?: string;
  worldL3?: string;
  worldL4?: string;
  genus?: string;
  species?: string;
  infraspecific?: string;
  authors?: string,
  searchType?: CdataSearchType | CdataSearchType[];
}

export interface CdataSearchGroupedResponse {
  latestRevisionHybrid?: boolean;
  latestRevisionGenus?: string;
  latestRevisionSpecies?: string;
  latestRevisionAuthors?: string;
  latestRevisionSubsp?: string;
  latestRevisionVar?: string;
  latestRevisionSubvar?: string;
  latestRevisionForma?: string;
  latestRevisionProles?: string;
  latestRevisionUnranked?: string;
  latestRevisionGenusH?: string;
  latestRevisionSpeciesH?: string;
  latestRevisionAuthorsH?: string;
  latestRevisionSubspH?: string;
  latestRevisionVarH?: string;
  latestRevisionSubvarH?: string;
  latestRevisionFormaH?: string;
  originalHybrid?: boolean;
  originalGenus?: string;
  originalSpecies?: string;
  originalAuthors?: string;
  originalSubsp?: string;
  originalVar?: string;
  originalSubvar?: string;
  originalForma?: string;
  originalProles?: string;
  originalUnranked?: string;
  originalGenusH?: string;
  originalSpeciesH?: string;
  originalAuthorsH?: string;
  originalSubspH?: string;
  originalVarH?: string;
  originalSubvarH?: string;
  originalFormaH?: string;
  acceptedHybrid?: boolean;
  acceptedGenus?: string;
  acceptedSpecies?: string;
  acceptedAuthors?: string;
  acceptedSubsp?: string;
  acceptedVar?: string;
  acceptedSubvar?: string;
  acceptedForma?: string;
  acceptedProles?: string;
  acceptedUnranked?: string;
  acceptedGenusH?: string;
  acceptedSpeciesH?: string;
  acceptedAuthorsH?: string;
  acceptedSubspH?: string;
  acceptedVarH?: string;
  acceptedSubvarH?: string;
  acceptedFormaH?: string;

  recordsCount: number;
  cdataIds: number[];
}
