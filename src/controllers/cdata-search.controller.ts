import {FilterBuilder, WhereBuilder} from '@loopback/filter';
import {
  repository
} from '@loopback/repository';
import {
  getModelSchemaRef, post,
  requestBody,
  response
} from '@loopback/rest';
import {CdataSearch} from '../models';
import {CdataSearchRepository} from '../repositories';
import {CdataSearchGroupedResponse, CdataSearchRequest} from './domain/cdata-search.domain';
import {groupSearchResults, nameWhere, worldsWhere} from './helpers/cdata-search.helpers';


export class CdataSearchController {
  constructor(
    @repository(CdataSearchRepository)
    public cdataSearchRepository: CdataSearchRepository,
  ) { }

  @post('/cdata-search')
  @response(200, {
    description: 'Array of CdataSearch model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(CdataSearch, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @requestBody({
      required: true,
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              n: {
                type: 'string',
              },
              dn: {
                type: 'string',
              },
              xRevised: {
                type: 'string',
              },
              ploidyLevelRevised: {
                type: 'string',
              },
              publicationAuthor: {
                type: 'string',
              },
              analysisAuthor: {
                type: 'string',
              },
              worldL1: {
                type: 'string',
              },
              worldL2: {
                type: 'string',
              },
              worldL3: {
                type: 'string',
              },
              worldL4: {
                type: 'string',
              },
              genus: {
                type: 'string',
              },
              species: {
                type: 'string',
              },
              infraspecific: {
                type: 'string',
              },
              searchType: {
                oneOf: [
                  {
                    type: 'string',
                  },
                  {
                    type: 'array',
                    items: {
                      type: 'string',
                    },
                  },
                ],
              },
            }
          },
        },
      },
    })
    request: CdataSearchRequest,
  ): Promise<CdataSearchGroupedResponse[]> {
    const {
      n, dn, xRevised, ploidyLevelRevised, publicationAuthor, analysisAuthor,
      worldL1, worldL2, worldL3, worldL4,
      genus, species, infraspecific, authors,
      searchType = 'latestRevision',
    } = request;

    const and = [];

    if (dn) and.push({or: [{dn}, {chCount: dn}]});
    if (n) and.push({n});
    if (xRevised) and.push({xRevised});
    if (ploidyLevelRevised) {
      and.push({
        or: [
          {ploidyLevelRevised}, {ploidyLevelRevisedDna: ploidyLevelRevised},
        ]
      });
    }
    if (analysisAuthor) and.push({countedBy: {like: `%${analysisAuthor}%`}});
    if (publicationAuthor) and.push({
      paperAuthor: {
        like: `%${publicationAuthor}%`,
      }
    });
    const world = worldsWhere(worldL1, worldL2, worldL3, worldL4);
    if (world) and.push(world);

    // TODO: coordinates not resolved yet

    const searchTypeArr = typeof searchType === 'string'
      ? [searchType] : searchType;
    searchTypeArr.forEach((type: string) => {
      const nameWhereForType = nameWhere(
        type, genus, species, infraspecific, authors,
      );
      and.push(...nameWhereForType);
    });

    const wb = new WhereBuilder<CdataSearch>();
    const where = wb.and(and).build();

    const fb = new FilterBuilder<CdataSearch>();
    const filter = fb.where(where).build();
    const results = await this.cdataSearchRepository.find(filter);

    return groupSearchResults(results);
  }
}
