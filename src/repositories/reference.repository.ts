import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {CardamineDataSource} from '../datasources';
import {Reference, ReferenceRelations, Literature} from '../models';
import {LiteratureRepository} from './literature.repository';

export class ReferenceRepository extends DefaultCrudRepository<
  Reference,
  typeof Reference.prototype.id,
  ReferenceRelations
> {

  public readonly literature: BelongsToAccessor<Literature, typeof Reference.prototype.id>;

  constructor(
    @inject('datasources.cardamine') dataSource: CardamineDataSource, @repository.getter('LiteratureRepository') protected literatureRepositoryGetter: Getter<LiteratureRepository>,
  ) {
    super(Reference, dataSource);
    this.literature = this.createBelongsToAccessorFor('literature', literatureRepositoryGetter,);
    this.registerInclusionResolver('literature', this.literature.inclusionResolver);
  }
}
