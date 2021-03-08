import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasOneRepositoryFactory, BelongsToAccessor, HasManyRepositoryFactory} from '@loopback/repository';
import {CardamineDataSource} from '../datasources';
import {Cdata, CdataRelations, Dna, Material, Persons, History} from '../models';
import {DnaRepository} from './dna.repository';
import {MaterialRepository} from './material.repository';
import {PersonsRepository} from './persons.repository';
import {HistoryRepository} from './history.repository';

export class CdataRepository extends DefaultCrudRepository<
  Cdata,
  typeof Cdata.prototype.id,
  CdataRelations
> {

  public readonly dna: HasOneRepositoryFactory<Dna, typeof Cdata.prototype.id>;

  public readonly material: HasOneRepositoryFactory<Material, typeof Cdata.prototype.id>;

  public readonly countedBy: BelongsToAccessor<Persons, typeof Cdata.prototype.id>;

  public readonly histories: HasManyRepositoryFactory<History, typeof Cdata.prototype.id>;

  constructor(
    @inject('datasources.cardamine') dataSource: CardamineDataSource, @repository.getter('DnaRepository') protected dnaRepositoryGetter: Getter<DnaRepository>, @repository.getter('MaterialRepository') protected materialRepositoryGetter: Getter<MaterialRepository>, @repository.getter('PersonsRepository') protected personsRepositoryGetter: Getter<PersonsRepository>, @repository.getter('HistoryRepository') protected historyRepositoryGetter: Getter<HistoryRepository>,
  ) {
    super(Cdata, dataSource);
    this.histories = this.createHasManyRepositoryFactoryFor('histories', historyRepositoryGetter,);
    this.registerInclusionResolver('histories', this.histories.inclusionResolver);
    this.countedBy = this.createBelongsToAccessorFor('countedBy', personsRepositoryGetter,);
    this.registerInclusionResolver('countedBy', this.countedBy.inclusionResolver);
    this.material = this.createHasOneRepositoryFactoryFor('material', materialRepositoryGetter);
    this.registerInclusionResolver('material', this.material.inclusionResolver);
    this.dna = this.createHasOneRepositoryFactoryFor('dna', dnaRepositoryGetter);
    this.registerInclusionResolver('dna', this.dna.inclusionResolver);
  }
}
