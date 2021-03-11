import groupby from 'lodash.groupby';
import {CdataSearch} from '../../models';
import {CdataSearchGroupedResponse} from '../domain/cdata-search.domain';
import {like} from './common.helper';

const cdataSearchProperties = CdataSearch.definition.properties;

const infraspecificWithPrefix = (prefix: string) => (
  Object.keys(cdataSearchProperties).filter((property) => (
    cdataSearchProperties[property].infraspecific
    && property.startsWith(prefix)
  ))
);

const groupingKey = (item: CdataSearch): string => {
  const latestRevision = [
    item.latestRevisionGenus, item.latestRevisionSpecies, item.latestRevisionAuthors,
    item.latestRevisionSubsp, item.latestRevisionVar, item.latestRevisionSubvar,
    item.latestRevisionForma, item.latestRevisionProles, item.latestRevisionUnranked,
    item.latestRevisionGenusH, item.latestRevisionSpeciesH, item.latestRevisionAuthorsH,
    item.latestRevisionSubspH, item.latestRevisionVarH, item.latestRevisionSubvarH,
    item.latestRevisionFormaH,
  ];
  const accepted = [
    item.acceptedGenus, item.acceptedSpecies, item.acceptedAuthors,
    item.acceptedSubsp, item.acceptedVar, item.acceptedSubvar,
    item.acceptedForma, item.acceptedProles, item.acceptedUnranked,
    item.acceptedGenusH, item.acceptedSpeciesH, item.acceptedAuthorsH,
    item.acceptedSubspH, item.acceptedVarH, item.acceptedSubvarH,
    item.acceptedFormaH,
  ];
  const original = [
    item.originalGenus, item.originalSpecies, item.originalAuthors,
    item.originalSubsp, item.originalVar, item.originalSubvar,
    item.originalForma, item.originalProles, item.originalUnranked,
    item.originalGenusH, item.originalSpeciesH, item.originalAuthorsH,
    item.originalSubspH, item.originalVarH, item.originalSubvarH,
    item.originalFormaH,
  ];

  const cleaned = [...latestRevision, ...accepted, ...original]
    .map((val) => val ? val.trim() : '');
  return cleaned.join('|');
};

export function worldsWhere(
  worldL1?: string, worldL2?: string, worldL3?: string, worldL4?: string,
): object | undefined {
  if (worldL4) {
    return {worldL4};
  }
  if (worldL3) {
    return {worldL3};
  }
  if (worldL2) {
    return {worldL2};
  }
  if (worldL1) {
    return {worldL1};
  }
  return undefined;
};

export function nameWhere(
  prefix: string, genus?: string, species?: string,
  infraspecific?: string, authors?: string,
): object[] {
  const and = [];
  if (genus) {
    and.push({
      or: [
        like(`${prefix}Genus`, genus), like(`${prefix}GenusH`, genus),
      ]
    });
  }
  if (species) {
    and.push({
      or: [
        like(`${prefix}Species`, species), like(`${prefix}SpeciesH`, species),
      ]
    })
  }
  if (infraspecific) {
    const infraspecificOr = infraspecificWithPrefix(prefix).map((prop) => (
      like(prop, infraspecific)
    ));
    and.push({
      or: infraspecificOr,
    });
  }
  if (authors) {
    and.push({
      or: [
        like(`${prefix}Authors`, authors), like(`${prefix}AuthorsH`, authors),
      ]
    })
  }

  return and;
}

export function groupSearchResults(results: CdataSearch[]) {
  const grouped = groupby(results, groupingKey);

  return Object.keys(grouped).map((key): CdataSearchGroupedResponse => {
    const resultsOfKey = grouped[key];
    // since items of the group have the same key, we take species properties from the first item
    const {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      idCdata, countedBy, n, dn, ploidyLevelRevised, ploidyLevelRevisedDna,
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      xRevised, chCount, worldL1, worldL2, worldL3, worldL4,
      ...groupReferent
    } = resultsOfKey[0];
    const partial = groupReferent as Partial<CdataSearchGroupedResponse>;

    return {
      ...partial,
      recordsCount: resultsOfKey.length,
      cdataIds: resultsOfKey.map((r) => r.idCdata),
    }
  });
}
