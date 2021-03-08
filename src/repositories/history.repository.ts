import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {CardamineDataSource} from '../datasources';
import {History, HistoryRelations, ListOfSpecies} from '../models';
import {ListOfSpeciesRepository} from './list-of-species.repository';

export class HistoryRepository extends DefaultCrudRepository<
  History,
  typeof History.prototype.id,
  HistoryRelations
> {

  public readonly listOfSpecies: BelongsToAccessor<ListOfSpecies, typeof History.prototype.id>;

  constructor(
    @inject('datasources.cardamine') dataSource: CardamineDataSource, @repository.getter('ListOfSpeciesRepository') protected listOfSpeciesRepositoryGetter: Getter<ListOfSpeciesRepository>,
  ) {
    super(History, dataSource);
    this.listOfSpecies = this.createBelongsToAccessorFor('listOfSpecies', listOfSpeciesRepositoryGetter,);
    this.registerInclusionResolver('listOfSpecies', this.listOfSpecies.inclusionResolver);
  }
}
