import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where
} from '@loopback/repository';
import {
  get,
  getModelSchemaRef, param,
  response
} from '@loopback/rest';
import {Literature} from '../models';
import {LiteratureRepository} from '../repositories';

export class LiteratureController {
  constructor(
    @repository(LiteratureRepository)
    public literatureRepository: LiteratureRepository,
  ) { }

  @get('/literature/count')
  @response(200, {
    description: 'Literature model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Literature) where?: Where<Literature>,
  ): Promise<Count> {
    return this.literatureRepository.count(where);
  }

  @get('/literature')
  @response(200, {
    description: 'Array of Literature model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Literature, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Literature) filter?: Filter<Literature>,
  ): Promise<Literature[]> {
    return this.literatureRepository.find(filter);
  }

  @get('/literature/{id}')
  @response(200, {
    description: 'Literature model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Literature, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Literature, {exclude: 'where'}) filter?: FilterExcludingWhere<Literature>
  ): Promise<Literature> {
    return this.literatureRepository.findById(id, filter);
  }

}
