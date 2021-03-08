import {
  Count,
  CountSchema,
  Filter,

  repository,
  Where
} from '@loopback/repository';
import {
  get,
  getModelSchemaRef, param,
  response
} from '@loopback/rest';
import {Persons} from '../models';
import {PersonsRepository} from '../repositories';

export class PersonsController {
  constructor(
    @repository(PersonsRepository)
    public personsRepository: PersonsRepository,
  ) { }

  @get('/persons/count')
  @response(200, {
    description: 'Persons model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Persons) where?: Where<Persons>,
  ): Promise<Count> {
    return this.personsRepository.count(where);
  }

  @get('/persons')
  @response(200, {
    description: 'Array of Persons model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Persons, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Persons) filter?: Filter<Persons>,
  ): Promise<Persons[]> {
    return this.personsRepository.find(filter);
  }

}
