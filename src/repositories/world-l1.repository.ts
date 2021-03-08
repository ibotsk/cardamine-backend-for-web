import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {CardamineDataSource} from '../datasources';
import {WorldL1, WorldL1Relations} from '../models';

export class WorldL1Repository extends DefaultCrudRepository<
  WorldL1,
  typeof WorldL1.prototype.id,
  WorldL1Relations
> {
  constructor(
    @inject('datasources.cardamine') dataSource: CardamineDataSource,
  ) {
    super(WorldL1, dataSource);
  }
}
