import {Getter, inject} from '@loopback/core';
import {BelongsToAccessor, DefaultCrudRepository, HasManyRepositoryFactory} from '@loopback/repository';
import {CardamineDataSource} from '../datasources';
import {ListOfSpecies, ListOfSpeciesRelations} from '../models';

export class ListOfSpeciesRepository extends DefaultCrudRepository<
  ListOfSpecies,
  typeof ListOfSpecies.prototype.id,
  ListOfSpeciesRelations
> {

  public readonly accepted: BelongsToAccessor<ListOfSpecies, typeof ListOfSpecies.prototype.id>;

  public readonly basionym: BelongsToAccessor<ListOfSpecies, typeof ListOfSpecies.prototype.id>;

  public readonly replaced: BelongsToAccessor<ListOfSpecies, typeof ListOfSpecies.prototype.id>;

  public readonly nomenNovum: BelongsToAccessor<ListOfSpecies, typeof ListOfSpecies.prototype.id>;

  public readonly basionymFor: HasManyRepositoryFactory<ListOfSpecies, typeof ListOfSpecies.prototype.id>;

  public readonly replacedFor: HasManyRepositoryFactory<ListOfSpecies, typeof ListOfSpecies.prototype.id>;

  public readonly nomenNovumFor: HasManyRepositoryFactory<ListOfSpecies, typeof ListOfSpecies.prototype.id>;

  constructor(
    @inject('datasources.cardamine') dataSource: CardamineDataSource,
  ) {
    super(ListOfSpecies, dataSource);
    this.accepted = this.createBelongsToAccessorFor('accepted', Getter.fromValue(this));
    this.registerInclusionResolver('accepted', this.accepted.inclusionResolver);
    this.basionym = this.createBelongsToAccessorFor('basionym', Getter.fromValue(this));
    this.registerInclusionResolver('basionym', this.basionym.inclusionResolver);
    this.replaced = this.createBelongsToAccessorFor('replaced', Getter.fromValue(this));
    this.registerInclusionResolver('replaced', this.replaced.inclusionResolver);
    this.nomenNovum = this.createBelongsToAccessorFor('nomenNovum', Getter.fromValue(this));
    this.registerInclusionResolver('nomenNovum', this.nomenNovum.inclusionResolver);

    this.basionymFor = this.createHasManyRepositoryFactoryFor('basionymFor', Getter.fromValue(this));
    this.registerInclusionResolver('basionymFor', this.basionymFor.inclusionResolver);
    this.replacedFor = this.createHasManyRepositoryFactoryFor('replacedFor', Getter.fromValue(this));
    this.registerInclusionResolver('replacedFor', this.replacedFor.inclusionResolver);
    this.nomenNovumFor = this.createHasManyRepositoryFactoryFor('nomenNovumFor', Getter.fromValue(this));
    this.registerInclusionResolver('nomenNovumFor', this.nomenNovumFor.inclusionResolver);
  }
}
