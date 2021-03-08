import {
  Filter,
  repository
} from '@loopback/repository';
import {
  get,
  getModelSchemaRef, param,
  response
} from '@loopback/rest';
import {WorldL1, WorldL2, WorldL3} from '../models';
import {WorldL4} from '../models/world-l4.model';
import {
  WorldL1Repository,
  WorldL2Repository,
  WorldL3Repository,
  WorldL4Repository
} from '../repositories';

export class WorldsController {
  constructor(
    @repository(WorldL1Repository) public worldL1Repository: WorldL1Repository,
    @repository(WorldL2Repository) public worldL2Repository: WorldL2Repository,
    @repository(WorldL3Repository) public worldL3Repository: WorldL3Repository,
    @repository(WorldL4Repository) public worldL4Repository: WorldL4Repository,
  ) { }

  @get('/worlds/level1')
  @response(200, {
    description: 'Array of WorldL1 model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(WorldL1, {includeRelations: true}),
        },
      },
    },
  })
  async findL1(
    @param.filter(WorldL1) filter?: Filter<WorldL1>,
  ): Promise<WorldL1[]> {
    return this.worldL1Repository.find(filter);
  }

  @get('/worlds/level2')
  @response(200, {
    description: 'Array of WorldL2 model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(WorldL2, {includeRelations: true}),
        },
      },
    },
  })
  async findL2(
    @param.filter(WorldL2) filter?: Filter<WorldL2>,
  ): Promise<WorldL2[]> {
    return this.worldL2Repository.find(filter);
  }

  @get('/worlds/level3')
  @response(200, {
    description: 'Array of WorldL3 model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(WorldL3, {includeRelations: true}),
        },
      },
    },
  })
  async findL3(
    @param.filter(WorldL3) filter?: Filter<WorldL3>,
  ): Promise<WorldL3[]> {
    return this.worldL3Repository.find(filter);
  }

  @get('/worlds/level4')
  @response(200, {
    description: 'Array of WorldL4 model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(WorldL4, {includeRelations: true}),
        },
      },
    },
  })
  async findL4(
    @param.filter(WorldL4) filter?: Filter<WorldL4>,
  ): Promise<WorldL4[]> {
    return this.worldL4Repository.find(filter);
  }

}
