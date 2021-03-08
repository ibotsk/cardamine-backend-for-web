import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {CardamineDataSource} from '../datasources';
import {ListOfSpecies, ListOfSpeciesRelations} from '../models';

export class ListOfSpeciesRepository extends DefaultCrudRepository<
  ListOfSpecies,
  typeof ListOfSpecies.prototype.id,
  ListOfSpeciesRelations
> {
  constructor(
    @inject('datasources.cardamine') dataSource: CardamineDataSource,
  ) {
    super(ListOfSpecies, dataSource);
  }
}
