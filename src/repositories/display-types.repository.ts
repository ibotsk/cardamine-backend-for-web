import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {CardamineDataSource} from '../datasources';
import {DisplayTypes, DisplayTypesRelations} from '../models';

export class DisplayTypesRepository extends DefaultCrudRepository<
  DisplayTypes,
  typeof DisplayTypes.prototype.id,
  DisplayTypesRelations
> {
  constructor(
    @inject('datasources.cardamine') dataSource: CardamineDataSource,
  ) {
    super(DisplayTypes, dataSource);
  }
}
