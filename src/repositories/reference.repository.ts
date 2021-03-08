import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {CardamineDataSource} from '../datasources';
import {Reference, ReferenceRelations, Literature, ListOfSpecies} from '../models';
import {LiteratureRepository} from './literature.repository';
import {ListOfSpeciesRepository} from './list-of-species.repository';

export class ReferenceRepository extends DefaultCrudRepository<
  Reference,
  typeof Reference.prototype.id,
  ReferenceRelations
> {

  public readonly literature: BelongsToAccessor<Literature, typeof Reference.prototype.id>;

  public readonly originalIdentification: BelongsToAccessor<ListOfSpecies, typeof Reference.prototype.id>;

  constructor(
    @inject('datasources.cardamine') dataSource: CardamineDataSource, @repository.getter('LiteratureRepository') protected literatureRepositoryGetter: Getter<LiteratureRepository>, @repository.getter('ListOfSpeciesRepository') protected listOfSpeciesRepositoryGetter: Getter<ListOfSpeciesRepository>,
  ) {
    super(Reference, dataSource);
    this.originalIdentification = this.createBelongsToAccessorFor('originalIdentification', listOfSpeciesRepositoryGetter,);
    this.registerInclusionResolver('originalIdentification', this.originalIdentification.inclusionResolver);
    this.literature = this.createBelongsToAccessorFor('literature', literatureRepositoryGetter,);
    this.registerInclusionResolver('literature', this.literature.inclusionResolver);
  }
}
