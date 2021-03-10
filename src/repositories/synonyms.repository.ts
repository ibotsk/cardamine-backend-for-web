import {Getter, inject} from '@loopback/core';
import {BelongsToAccessor, DefaultCrudRepository, repository} from '@loopback/repository';
import {CardamineDataSource} from '../datasources';
import {ListOfSpecies, Synonyms, SynonymsRelations} from '../models';
import {ListOfSpeciesAsSynonymRepository} from '../repositories';

export class SynonymsRepository extends DefaultCrudRepository<
  Synonyms,
  typeof Synonyms.prototype.id,
  SynonymsRelations
> {

  public readonly name: BelongsToAccessor<ListOfSpecies, typeof Synonyms.prototype.id>;

  constructor(
    @inject('datasources.cardamine') dataSource: CardamineDataSource,
    @repository.getter('ListOfSpeciesAsSynonymRepository') protected listOfSpeciesAsSynonymRepositoryGetter: Getter<ListOfSpeciesAsSynonymRepository>,
  ) {
    super(Synonyms, dataSource);
    this.name = this.createBelongsToAccessorFor('name', listOfSpeciesAsSynonymRepositoryGetter,);
    this.registerInclusionResolver('name', this.name.inclusionResolver);
  }
}

// used in ListOfSpeciesAsSynonymRepository to avoid circular dependency
export class SynonymsOfSynonymsRepository extends DefaultCrudRepository<
  Synonyms,
  typeof Synonyms.prototype.id,
  SynonymsRelations
> {

  constructor(
    @inject('datasources.cardamine') dataSource: CardamineDataSource,
  ) {
    super(Synonyms, dataSource);
  }
}
