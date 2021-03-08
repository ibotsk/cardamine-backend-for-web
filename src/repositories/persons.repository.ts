import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {CardamineDataSource} from '../datasources';
import {Persons, PersonsRelations} from '../models';

export class PersonsRepository extends DefaultCrudRepository<
  Persons,
  typeof Persons.prototype.id,
  PersonsRelations
> {
  constructor(
    @inject('datasources.cardamine') dataSource: CardamineDataSource,
  ) {
    super(Persons, dataSource);
  }
}
