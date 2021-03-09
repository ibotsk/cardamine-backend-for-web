/* eslint-disable @typescript-eslint/no-explicit-any */
import {Getter, inject} from '@loopback/core';
import {BelongsToAccessor, DefaultCrudRepository, HasOneRepositoryFactory, repository} from '@loopback/repository';
import {CardamineDataSource} from '../datasources';
import {Material, MaterialRelations, Persons, Reference, WorldL4} from '../models';
import {PersonsRepository} from './persons.repository';
import {ReferenceRepository} from './reference.repository';
import {WorldL4Repository} from './world-l4.repository';

export class MaterialRepository extends DefaultCrudRepository<
  Material,
  typeof Material.prototype.id,
  MaterialRelations
> {

  public readonly reference: HasOneRepositoryFactory<Reference, typeof Material.prototype.id>;

  public readonly collectedBy: BelongsToAccessor<Persons, typeof Material.prototype.id>;

  public readonly identifiedBy: BelongsToAccessor<Persons, typeof Material.prototype.id>;

  public readonly worldL4: BelongsToAccessor<WorldL4, typeof Material.prototype.id>;

  constructor(
    @inject('datasources.cardamine') dataSource: CardamineDataSource,
    @repository.getter('ReferenceRepository') protected referenceRepositoryGetter: Getter<ReferenceRepository>,
    @repository.getter('PersonsRepository') protected personsRepositoryGetter: Getter<PersonsRepository>,
    @repository.getter('WorldL4Repository') protected worldL4RepositoryGetter: Getter<WorldL4Repository>,
  ) {
    super(Material, dataSource);

    (this.modelClass as any).observe('persist', async (ctx: any) => {
      delete ctx.data.coordinatesGeoref;
      delete ctx.data.coordinatesForMap;
    });

    this.worldL4 = this.createBelongsToAccessorFor('worldL4', worldL4RepositoryGetter,);
    this.registerInclusionResolver('worldL4', this.worldL4.inclusionResolver);
    this.reference = this.createHasOneRepositoryFactoryFor('reference', referenceRepositoryGetter);
    this.registerInclusionResolver('reference', this.reference.inclusionResolver);
    this.collectedBy = this.createBelongsToAccessorFor('collectedBy', personsRepositoryGetter,);
    this.registerInclusionResolver('collectedBy', this.collectedBy.inclusionResolver);
    this.identifiedBy = this.createBelongsToAccessorFor('identifiedBy', personsRepositoryGetter,);
    this.registerInclusionResolver('identifiedBy', this.identifiedBy.inclusionResolver);
  }
}
