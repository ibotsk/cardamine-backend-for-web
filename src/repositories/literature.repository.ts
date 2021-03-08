import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {CardamineDataSource} from '../datasources';
import {Literature, LiteratureRelations, DisplayTypes} from '../models';
import {DisplayTypesRepository} from './display-types.repository';

export class LiteratureRepository extends DefaultCrudRepository<
  Literature,
  typeof Literature.prototype.id,
  LiteratureRelations
> {

  public readonly displayType: BelongsToAccessor<DisplayTypes, typeof Literature.prototype.id>;

  constructor(
    @inject('datasources.cardamine') dataSource: CardamineDataSource, @repository.getter('DisplayTypesRepository') protected displayTypesRepositoryGetter: Getter<DisplayTypesRepository>,
  ) {
    super(Literature, dataSource);
    this.displayType = this.createBelongsToAccessorFor('displayType', displayTypesRepositoryGetter,);
    this.registerInclusionResolver('displayType', this.displayType.inclusionResolver);
  }
}
