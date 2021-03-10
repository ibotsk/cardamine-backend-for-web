import {FilterBuilder} from '@loopback/filter';
import {
  repository
} from '@loopback/repository';
import {
  get,
  getModelSchemaRef, param,
  response
} from '@loopback/rest';
import {ListOfSpecies} from '../models';
import {ListOfSpeciesRepository} from '../repositories';
import {ListOfSpeciesForRelationsResponse} from './domain/list-of-species.domain';
import {getListOfSpeciesDefaultOrder} from './helpers/list-of-species.helper';

export class ListOfSpeciesController {
  constructor(
    @repository(ListOfSpeciesRepository)
    public listOfSpeciesRepository: ListOfSpeciesRepository,
  ) { }

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
