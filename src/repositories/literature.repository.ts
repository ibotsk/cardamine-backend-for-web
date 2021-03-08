import {Getter, inject} from '@loopback/core';
import {BelongsToAccessor, DefaultCrudRepository, repository} from '@loopback/repository';
import {CardamineDataSource} from '../datasources';
import {DisplayTypes, Literature, LiteratureRelations} from '../models';
import {DisplayTypesRepository} from './display-types.repository';

export class LiteratureRepository extends DefaultCrudRepository<
  Literature,
  typeof Literature.prototype.id,
  LiteratureRelations
> {

  public readonly displayTypeText: BelongsToAccessor<DisplayTypes, typeof Literature.prototype.id>;

  constructor(
    @inject('datasources.cardamine') dataSource: CardamineDataSource, @repository.getter('DisplayTypesRepository') protected displayTypesRepositoryGetter: Getter<DisplayTypesRepository>,
  ) {
    super(Literature, dataSource);
    this.displayTypeText = this.createBelongsToAccessorFor('displayTypeText', displayTypesRepositoryGetter,);
    this.registerInclusionResolver('displayTypeText', this.displayTypeText.inclusionResolver);
  }
}
