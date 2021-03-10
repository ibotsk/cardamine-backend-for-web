import {
  repository
} from '@loopback/repository';
import {
  get,
  getModelSchemaRef,

  param
} from '@loopback/rest';
import {
  Synonyms
} from '../models';
import {ListOfSpeciesRepository} from '../repositories';
import {ListOfSpeciesSynonymsResponse} from './domain/list-of-species-synonyms.domain';
import {fetchSynonyms} from './helpers/synonyms.helper';

export class ListOfSpeciesSynonymsController {
  constructor(
    @repository(ListOfSpeciesRepository) protected listOfSpeciesRepository: ListOfSpeciesRepository,
  ) { }

  @get('/list-of-species/{id}/synonyms', {
    responses: {
      '200': {
        description: 'Nomenclatoric, taxonomic and other synonyms',
        content: {
          'application/json': {
            schema: {
              type: 'object',
              required: [
                'nomenclatoricSynonyms',
                'taxonomicSynonyms',
              ],
              properties: {
                nomenclatoricSynonyms: {type: 'array', items: getModelSchemaRef(Synonyms)},
                taxonomicSynonyms: {type: 'array', items: getModelSchemaRef(Synonyms)},
              }
            },
          },
        },
      },
    },
  })
  async findSynonyms(
    @param.path.number('id') id: number,
    @param.query.boolean('withSubsynonyms') withSubsynonyms = false,
  ): Promise<ListOfSpeciesSynonymsResponse> {
    const nomenclatoricSynonyms = await fetchSynonyms(
      this.listOfSpeciesRepository, id, 3,
    );

    const taxonomicSynonyms = await fetchSynonyms(
      this.listOfSpeciesRepository, id, 2, withSubsynonyms,
    );

    return {
      nomenclatoricSynonyms,
      taxonomicSynonyms,
    };
  }

  @get('/list-of-species/{id}/invalid-designations', {
    responses: {
      '200': {
        description: 'Invalid designations',
        content: {
          'application/json': {
            schema:
              {type: 'array', items: getModelSchemaRef(Synonyms)}
          },
        },
      },
    },
  })
  async findInvalidDesignation(
    @param.path.number('id') id: number,
  ): Promise<Synonyms[]> {
    return fetchSynonyms(
      this.listOfSpeciesRepository, id, 1,
    );
  }

  @get('/list-of-species/{id}/misidentifications', {
    responses: {
      '200': {
        description: 'Misidentifications',
        content: {
          'application/json': {
            schema:
              {type: 'array', items: getModelSchemaRef(Synonyms)}
          },
        },
      },
    },
  })
  async findMisidentifications(
    @param.path.number('id') id: number,
  ): Promise<Synonyms[]> {
    return fetchSynonyms(
      this.listOfSpeciesRepository, id, 4,
    );
  }

}
