import {FilterBuilder, WhereBuilder} from '@loopback/filter';
import {
  repository
} from '@loopback/repository';
import {
  get,
  getModelSchemaRef, param, post,
  requestBody,
  response
} from '@loopback/rest';
import {ListOfSpecies} from '../models';
import {ListOfSpeciesRepository} from '../repositories';
import {ListOfSpeciesForRelationsResponse, ListOfSpeciesSearchRequest, ListOfSpeciesSearchResponse} from './domain/list-of-species.domain';
import {like} from './helpers/common.helper';
import {getInfraspecificFields, getListOfSpeciesDefaultOrder} from './helpers/list-of-species.helper';

export class ListOfSpeciesController {
  constructor(
    @repository(ListOfSpeciesRepository)
    public listOfSpeciesRepository: ListOfSpeciesRepository,
  ) { }

  @post('/list-of-species/search')
  @response(200, {
    description: 'Array of ListOFSpecies model instances',
    content: {
      'application/json': {
        schema: {
          type: 'object',
          required: ['data', 'totalRecords'],
          properties: {
            data: {
              type: 'array',
              items: getModelSchemaRef(ListOfSpecies, {includeRelations: true}),
            },
            totalRecord: {type: 'integer'},
            pagination: {
              type: 'object',
              properties: {
                page: {type: 'integer'},
                rowsPerPage: {type: 'integer'},
                totalPages: {type: 'integer'},
              }
            }
          }

        },
      },
    },
  })
  async searchScientific(
    @requestBody({
      required: true,
      content: {
        'application/json': {
          schema: {
            allOf: [
              {
                type: 'object',
                properties: {
                  page: {
                    type: 'integer',
                    minimum: 1,
                  },
                  rowsPerPage: {
                    type: 'integer',
                    minimum: 1,
                  },
                },
              },
              {
                type: 'object',
                anyOf: [
                  {
                    type: 'object',
                    required: ['genus'],
                    properties: {
                      genus: {
                        type: 'string',
                        minLength: 1,
                      },
                    }
                  },
                  {
                    type: 'object',
                    required: ['species'],
                    properties: {
                      species: {
                        type: 'string',
                        minLength: 1,
                      },
                    }
                  },
                  {
                    type: 'object',
                    required: ['infraspecific'],
                    properties: {
                      infraspecific: {
                        type: 'string',
                        minLength: 1,
                      },
                    }
                  },
                  {
                    type: 'object',
                    required: ['authors'],
                    properties: {
                      authors: {
                        type: 'string',
                        minLength: 1,
                      },
                    }
                  },
                  {
                    type: 'object',
                    required: ['status'],
                    properties: {
                      status: {
                        type: 'array',
                        items: {
                          type: 'string',
                          minLength: 1,
                        }
                      },
                    }
                  }
                ],
              },
            ],
          },
        },
      },
    })
    searchRequest: ListOfSpeciesSearchRequest,
  ): Promise<ListOfSpeciesSearchResponse> {
    const {
      genus, species, infraspecific, status, authors,
      page = 1, rowsPerPage,
    } = searchRequest;

    const ands = [];
    if (genus) {
      ands.push(like('genus', genus));
    }
    if (species) {
      ands.push({
        or: [
          like('species', species),
          like('speciesH', species),
        ],
      });
    }
    if (infraspecific) {
      const infraOrs = getInfraspecificFields().map((field) => (
        like(field, infraspecific)
      ));
      ands.push({or: infraOrs});
    }
    if (authors) {
      ands.push({
        or: [
          like('authors', authors),
        ],
      });
    }
    if (status && status.length > 0) {
      const statusOrs = {ntype: {inq: status}};
      ands.push(statusOrs);
    }

    const wb = new WhereBuilder<ListOfSpecies>();
    const where = wb.and(ands).build();
    const fb = new FilterBuilder<ListOfSpecies>();
    fb.where(where);

    if (rowsPerPage) {
      fb.offset((page - 1) * rowsPerPage).limit(rowsPerPage);
    }
    const defaultOrder = getListOfSpeciesDefaultOrder();
    const filter = fb
      .include('accepted')
      .order(['ntypeOrder', ...defaultOrder])
      .build();

    const data = await this.listOfSpeciesRepository.find(filter);
    const countResult = await this.listOfSpeciesRepository.count(where);
    const totalCount = countResult.count;

    const totalPages = rowsPerPage ? Math.ceil(totalCount / rowsPerPage) : 1;

    return {
      data,
      totalRecords: totalCount,
      pagination: {
        page,
        rowsPerPage,
        totalPages,
      },
    };
  }

  @get('/list-of-species/{id}')
  @response(200, {
    description: 'ListOfSpecies model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(ListOfSpecies, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
  ): Promise<ListOfSpecies> {
    const fb = new FilterBuilder<ListOfSpecies>();
    const filter = fb
      .include('accepted')
      .include('basionym')
      .include('replaced')
      .include('nomenNovum')
      .build();
    return this.listOfSpeciesRepository.findById(id, filter);
  }

  @get('/list-of-species/{id}/for-relations')
  @response(200, {
    description: 'Names for which this name is a: basionym, nomen novum, replaced name',
    content: {
      'application/json': {
        schema: {
          type: 'object',
          required: [
            'basionymFor', 'nomenNovumFor', 'replacedFor',
          ],
          properties: {
            basionymFor: {type: 'array', items: getModelSchemaRef(ListOfSpecies)},
            nomenNovumFor: {type: 'array', items: getModelSchemaRef(ListOfSpecies)},
            replacedFor: {type: 'array', items: getModelSchemaRef(ListOfSpecies)},
          },
        },
      },
    }
  })
  async findForRelations(
    @param.path.number('id') id: number,
  ): Promise<ListOfSpeciesForRelationsResponse> {
    const fb = new FilterBuilder<ListOfSpecies>();
    const filter = fb.order(getListOfSpeciesDefaultOrder()).build();

    const basionymFor = await this.listOfSpeciesRepository.basionymFor(id).find(filter);
    const nomenNovumFor = await this.listOfSpeciesRepository.nomenNovumFor(id).find(filter);
    const replacedFor = await this.listOfSpeciesRepository.replacedFor(id).find(filter);

    return {
      basionymFor,
      nomenNovumFor,
      replacedFor,
    };
  }

}
