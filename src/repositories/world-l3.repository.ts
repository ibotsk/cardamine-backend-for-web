import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {CardamineDataSource} from '../datasources';
import {WorldL3, WorldL3Relations, WorldL2} from '../models';
import {WorldL2Repository} from './world-l2.repository';

export class WorldL3Repository extends DefaultCrudRepository<
  WorldL3,
  typeof WorldL3.prototype.id,
  WorldL3Relations
> {

  public readonly worldL2: BelongsToAccessor<WorldL2, typeof WorldL3.prototype.id>;

  constructor(
    @inject('datasources.cardamine') dataSource: CardamineDataSource, @repository.getter('WorldL2Repository') protected worldL2RepositoryGetter: Getter<WorldL2Repository>,
  ) {
    super(WorldL3, dataSource);
    this.worldL2 = this.createBelongsToAccessorFor('worldL2', worldL2RepositoryGetter,);
    this.registerInclusionResolver('worldL2', this.worldL2.inclusionResolver);
  }
}
