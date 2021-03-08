import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasOneRepositoryFactory} from '@loopback/repository';
import {CardamineDataSource} from '../datasources';
import {Material, MaterialRelations, Reference} from '../models';
import {ReferenceRepository} from './reference.repository';

export class MaterialRepository extends DefaultCrudRepository<
  Material,
  typeof Material.prototype.id,
  MaterialRelations
> {

  public readonly reference: HasOneRepositoryFactory<Reference, typeof Material.prototype.id>;

  constructor(
    @inject('datasources.cardamine') dataSource: CardamineDataSource, @repository.getter('ReferenceRepository') protected referenceRepositoryGetter: Getter<ReferenceRepository>,
  ) {
    super(Material, dataSource);
    this.reference = this.createHasOneRepositoryFactoryFor('reference', referenceRepositoryGetter);
    this.registerInclusionResolver('reference', this.reference.inclusionResolver);
  }
}
