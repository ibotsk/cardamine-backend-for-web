import {FilterBuilder, WhereBuilder} from '@loopback/filter';
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
  post,
  requestBody,
  response
} from '@loopback/rest';
import {Cdata} from '../models';
import {CdataRepository} from '../repositories';
import {CdataForTableRequest} from './domain/cdata.domain';

export class CdataController {
  constructor(
    @repository(CdataRepository)
    public cdataRepository: CdataRepository,
  ) { }

  @get('/cdata/count')
  @response(200, {
    description: 'Cdata model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Cdata) where?: Where<Cdata>,
  ): Promise<Count> {
    return this.cdataRepository.count(where);
  }

  @post('/cdata/for-table')
  @response(200, {
    description: 'Array of Cdata model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Cdata, {includeRelations: true}),
        },
      },
    },
  })
  async findAllByIds(
    @requestBody({
      required: true,
      content: {
        'application/json': {
          schema: {
            type: 'object',
            required: ['ids', 'limit', 'offset'],
            properties: {
              ids: {
                type: 'array',
                items: {
                  type: 'number',
                  minLength: 1,
                }
              },
              limit: {
                type: 'number',
              },
              offset: {
                type: 'number',
              },
            }
          },
        },
      },
    })
    request: CdataForTableRequest,
  ): Promise<Cdata[]> {
    const {ids, limit, offset} = request;

    const wb = new WhereBuilder<Cdata>();
    const where = wb.inq('id', ids).build();

    const fb = new FilterBuilder<Cdata>();
    const filter = fb
      .fields('id', 'n', 'dn', 'ploidyLevel', 'ploidyLevelRevised')
      .include('dna')
      .include({
        relation: 'material',
        scope: {
          include: [
            {
              relation: 'reference',
              scope: {
                include: ['literature'],
              },
            }
          ],
        },
      })
      .where(where)
      .limit(limit)
      .offset(offset)
      .order('id')
      .build();

    return this.cdataRepository.find(filter);
  }

  @get('/cdata')
  @response(200, {
    description: 'Array of Cdata model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Cdata, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Cdata) filter?: Filter<Cdata>,
  ): Promise<Cdata[]> {
    return this.cdataRepository.find(filter);
  }

  @get('/cdata/{id}')
  @response(200, {
    description: 'Cdata model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Cdata, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Cdata, {exclude: 'where'}) filter?: FilterExcludingWhere<Cdata>
  ): Promise<Cdata> {
    return this.cdataRepository.findById(id, filter);
  }

}
