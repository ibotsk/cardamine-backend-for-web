import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {CardamineDataSource} from '../datasources';
import {WorldL2, WorldL2Relations} from '../models';

export class WorldL2Repository extends DefaultCrudRepository<
  WorldL2,
  typeof WorldL2.prototype.id,
  WorldL2Relations
> {
  constructor(
    @inject('datasources.cardamine') dataSource: CardamineDataSource,
  ) {
    super(WorldL2, dataSource);
  }
}
