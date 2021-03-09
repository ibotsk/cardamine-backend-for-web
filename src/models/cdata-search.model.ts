import {Entity, model, property} from '@loopback/repository';

@model({
  name: 'v_cdata_search',
})
export class CdataSearch extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: false,
    required: true,
    name: 'id_cdata',
  })
  idCdata: number;

  @property({
    type: 'string',
    name: 'counted_by',
  })
  countedBy?: string;

  @property({
    type: 'string',
  })
  n?: string;

  @property({
    type: 'string',
  })
  dn?: string;

  @property({
    type: 'string',
    name: 'ploidy_level_revised',
  })
  ploidyLevelRevised?: string;

  @property({
    type: 'string',
    name: 'x_revised',
  })
  xRevised?: string;

  @property({
    type: 'string',
    name: 'ch_count',
  })
  chCount?: string;

  @property({
    type: 'string',
    name: 'ploidy_level_revised_dna',
  })
  ploidyLevelRevisedDna?: string;

  @property({
    type: 'boolean',
    name: 'original_hybrid',
  })
  originalHybrid?: boolean;

  @property({
    type: 'string',
    name: 'original_genus',
  })
  originalGenus?: string;

  @property({
    type: 'string',
    name: 'original_species',
  })
  originalSpecies?: string;

  @property({
    type: 'string',
    name: 'original_authors',
  })
  originalAuthors?: string;

  @property({
    type: 'string',
    name: 'original_subsp',
    infraspecific: true,
  })
  originalSubsp?: string;

  @property({
    type: 'string',
    name: 'original_var',
    infraspecific: true,
  })
  originalVar?: string;

  @property({
    type: 'string',
    name: 'original_subvar',
    infraspecific: true,
  })
  originalSubvar?: string;

  @property({
    type: 'string',
    name: 'original_forma',
    infraspecific: true,
  })
  originalForma?: string;

  @property({
    type: 'string',
    name: 'original_proles',
    infraspecific: true,
  })
  originalProles?: string;

  @property({
    type: 'string',
    name: 'original_unranked',
    infraspecific: true,
  })
  originalUnranked?: string;

  @property({
    type: 'string',
    name: 'original_genus_h',
  })
  originalGenusH?: string;

  @property({
    type: 'string',
    name: 'original_species_h',
  })
  originalSpeciesH?: string;

  @property({
    type: 'string',
    name: 'original_authors_h',
  })
  originalAuthorsH?: string;

  @property({
    type: 'string',
    name: 'original_subsp_h',
    infraspecific: true,
  })
  originalSubspH?: string;

  @property({
    type: 'string',
    name: 'original_var_h',
    infraspecific: true,
  })
  originalVarH?: string;

  @property({
    type: 'string',
    name: 'original_subvar_h',
    infraspecific: true,
  })
  originalSubvarH?: string;

  @property({
    type: 'string',
    name: 'original_forma_h',
    infraspecific: true,
  })
  originalFormaH?: string;

  @property({
    type: 'boolean',
    name: 'latest_revision_hybrid',
  })
  latestRevisionHybrid?: boolean;

  @property({
    type: 'string',
    name: 'latest_revision_genus',
  })
  latestRevisionGenus?: string;

  @property({
    type: 'string',
    name: 'latest_revision_species',
  })
  latestRevisionSpecies?: string;

  @property({
    type: 'string',
    name: 'latest_revision_authors',
  })
  latestRevisionAuthors?: string;

  @property({
    type: 'string',
    name: 'latest_revision_subsp',
    infraspecific: true,
  })
  latestRevisionSubsp?: string;

  @property({
    type: 'string',
    name: 'latest_revision_var',
    infraspecific: true,
  })
  latestRevisionVar?: string;

  @property({
    type: 'string',
    name: 'latest_revision_subvar',
    infraspecific: true,
  })
  latestRevisionSubvar?: string;

  @property({
    type: 'string',
    name: 'latest_revision_forma',
    infraspecific: true,
  })
  latestRevisionForma?: string;

  @property({
    type: 'string',
    name: 'latest_revision_proles',
    infraspecific: true,
  })
  latestRevisionProles?: string;

  @property({
    type: 'string',
    name: 'latest_revision_unranked',
    infraspecific: true,
  })
  latestRevisionUnranked?: string;

  @property({
    type: 'string',
    name: 'latest_revision_genus_h',
  })
  latestRevisionGenusH?: string;

  @property({
    type: 'string',
    name: 'latest_revision_species_h',
  })
  latestRevisionSpeciesH?: string;

  @property({
    type: 'string',
    name: 'latest_revision_authors_h',
  })
  latestRevisionAuthorsH?: string;

  @property({
    type: 'string',
    name: 'latest_revision_subsp_h',
    infraspecific: true,
  })
  latestRevisionSubspH?: string;

  @property({
    type: 'string',
    name: 'latest_revision_var_h',
    infraspecific: true,
  })
  latestRevisionVarH?: string;

  @property({
    type: 'string',
    name: 'latest_revision_subvar_h',
    infraspecific: true,
  })
  latestRevisionSubvarH?: string;

  @property({
    type: 'string',
    name: 'latest_revision_forma_h',
    infraspecific: true,
  })
  latestRevisionFormaH?: string;

  @property({
    type: 'boolean',
    name: 'accepted_hybrid',
  })
  acceptedHybrid?: boolean;

  @property({
    type: 'string',
    name: 'accepted_genus',
  })
  acceptedGenus?: string;

  @property({
    type: 'string',
    name: 'accepted_species',
  })
  acceptedSpecies?: string;

  @property({
    type: 'string',
    name: 'accepted_authors',
  })
  acceptedAuthors?: string;

  @property({
    type: 'string',
    name: 'accepted_subsp',
    infraspecific: true,
  })
  acceptedSubsp?: string;

  @property({
    type: 'string',
    name: 'accepted_var',
    infraspecific: true,
  })
  acceptedVar?: string;

  @property({
    type: 'string',
    name: 'accepted_subvar',
    infraspecific: true,
  })
  acceptedSubvar?: string;

  @property({
    type: 'string',
    name: 'accepted_forma',
    infraspecific: true,
  })
  acceptedForma?: string;

  @property({
    type: 'string',
    name: 'accepted_proles',
    infraspecific: true,
  })
  acceptedProles?: string;

  @property({
    type: 'string',
    name: 'accepted_unranked',
    infraspecific: true,
  })
  acceptedUnranked?: string;

  @property({
    type: 'string',
    name: 'accepted_genus_h',
  })
  acceptedGenusH?: string;

  @property({
    type: 'string',
    name: 'accepted_species_h',
  })
  acceptedSpeciesH?: string;

  @property({
    type: 'string',
    name: 'accepted_authors_h',
  })
  acceptedAuthorsH?: string;

  @property({
    type: 'string',
    name: 'accepted_subsp_h',
    infraspecific: true,
  })
  acceptedSubspH?: string;

  @property({
    type: 'string',
    name: 'accepted_var_h',
    infraspecific: true,
  })
  acceptedVarH?: string;

  @property({
    type: 'string',
    name: 'accepted_subvar_h',
    infraspecific: true,
  })
  acceptedSubvarH?: string;

  @property({
    type: 'string',
    name: 'accepted_forma_h',
    infraspecific: true,
  })
  acceptedFormaH?: string;

  @property({
    type: 'string',
    name: 'paper_author',
  })
  paperAuthor?: string;

  @property({
    type: 'string',
    name: 'world_l1',
  })
  worldL1?: string;

  @property({
    type: 'string',
    name: 'world_l2',
  })
  worldL2?: string;

  @property({
    type: 'string',
    name: 'world_l3',
  })
  worldL3?: string;

  @property({
    type: 'string',
    name: 'world_l4',
  })
  worldL4?: string;


  constructor(data?: Partial<CdataSearch>) {
    super(data);
  }

}

export interface CdataSearchRelations {
  // describe navigational properties here
}

export type CdataSearchWithRelations = CdataSearch & CdataSearchRelations;
