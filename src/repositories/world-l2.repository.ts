import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {CardamineDataSource} from '../datasources';
import {WorldL2, WorldL2Relations, WorldL1} from '../models';
import {WorldL1Repository} from './world-l1.repository';

export class WorldL2Repository extends DefaultCrudRepository<
  WorldL2,
  typeof WorldL2.prototype.id,
  WorldL2Relations
> {

  public readonly worldL1: BelongsToAccessor<WorldL1, typeof WorldL2.prototype.id>;

  constructor(
    @inject('datasources.cardamine') dataSource: CardamineDataSource, @repository.getter('WorldL1Repository') protected worldL1RepositoryGetter: Getter<WorldL1Repository>,
  ) {
    super(WorldL2, dataSource);
    this.worldL1 = this.createBelongsToAccessorFor('worldL1', worldL1RepositoryGetter,);
    this.registerInclusionResolver('worldL1', this.worldL1.inclusionResolver);
  }
}
