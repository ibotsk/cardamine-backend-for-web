import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {CardamineDataSource} from '../datasources';
import {CdataSearch, CdataSearchRelations} from '../models';

export class CdataSearchRepository extends DefaultCrudRepository<
  CdataSearch,
  typeof CdataSearch.prototype.idCdata,
  CdataSearchRelations
> {
  constructor(
    @inject('datasources.cardamine') dataSource: CardamineDataSource,
  ) {
    super(CdataSearch, dataSource);
  }
}
