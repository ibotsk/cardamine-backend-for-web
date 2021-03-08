import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasOneRepositoryFactory} from '@loopback/repository';
import {CardamineDataSource} from '../datasources';
import {Cdata, CdataRelations, Dna, Material} from '../models';
import {DnaRepository} from './dna.repository';
import {MaterialRepository} from './material.repository';

export class CdataRepository extends DefaultCrudRepository<
  Cdata,
  typeof Cdata.prototype.id,
  CdataRelations
> {

  public readonly dna: HasOneRepositoryFactory<Dna, typeof Cdata.prototype.id>;

  public readonly material: HasOneRepositoryFactory<Material, typeof Cdata.prototype.id>;

  constructor(
    @inject('datasources.cardamine') dataSource: CardamineDataSource, @repository.getter('DnaRepository') protected dnaRepositoryGetter: Getter<DnaRepository>, @repository.getter('MaterialRepository') protected materialRepositoryGetter: Getter<MaterialRepository>,
  ) {
    super(Cdata, dataSource);
    this.material = this.createHasOneRepositoryFactoryFor('material', materialRepositoryGetter);
    this.registerInclusionResolver('material', this.material.inclusionResolver);
    this.dna = this.createHasOneRepositoryFactoryFor('dna', dnaRepositoryGetter);
    this.registerInclusionResolver('dna', this.dna.inclusionResolver);
  }
}
