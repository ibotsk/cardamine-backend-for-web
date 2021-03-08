import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {CardamineDataSource} from '../datasources';
import {WorldL4, WorldL4Relations, WorldL3} from '../models';
import {WorldL3Repository} from './world-l3.repository';

export class WorldL4Repository extends DefaultCrudRepository<
  WorldL4,
  typeof WorldL4.prototype.id,
  WorldL4Relations
> {

  public readonly worldL3: BelongsToAccessor<WorldL3, typeof WorldL4.prototype.id>;

  constructor(
    @inject('datasources.cardamine') dataSource: CardamineDataSource, @repository.getter('WorldL3Repository') protected worldL3RepositoryGetter: Getter<WorldL3Repository>,
  ) {
    super(WorldL4, dataSource);
    this.worldL3 = this.createBelongsToAccessorFor('worldL3', worldL3RepositoryGetter,);
    this.registerInclusionResolver('worldL3', this.worldL3.inclusionResolver);
  }
}
