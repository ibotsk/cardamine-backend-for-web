import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {CardamineDataSource} from '../datasources';
import {WorldL4, WorldL4Relations} from '../models';

export class WorldL4Repository extends DefaultCrudRepository<
  WorldL4,
  typeof WorldL4.prototype.id,
  WorldL4Relations
> {
  constructor(
    @inject('datasources.cardamine') dataSource: CardamineDataSource,
  ) {
    super(WorldL4, dataSource);
  }
}
