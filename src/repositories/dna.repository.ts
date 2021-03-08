import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {CardamineDataSource} from '../datasources';
import {Dna, DnaRelations} from '../models';

export class DnaRepository extends DefaultCrudRepository<
  Dna,
  typeof Dna.prototype.id,
  DnaRelations
> {
  constructor(
    @inject('datasources.cardamine') dataSource: CardamineDataSource,
  ) {
    super(Dna, dataSource);
  }
}
