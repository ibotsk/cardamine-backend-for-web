import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {CardamineDataSource} from '../datasources';
import {WorldL3, WorldL3Relations} from '../models';

export class WorldL3Repository extends DefaultCrudRepository<
  WorldL3,
  typeof WorldL3.prototype.id,
  WorldL3Relations
> {
  constructor(
    @inject('datasources.cardamine') dataSource: CardamineDataSource,
  ) {
    super(WorldL3, dataSource);
  }
}
