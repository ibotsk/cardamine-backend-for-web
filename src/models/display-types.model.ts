import {Entity, model, property} from '@loopback/repository';

@model({
  name: 'display_types',
})
export class DisplayTypes extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
    hidden: true,
  })
  id?: number;

  @property({
    type: 'string',
    required: true,
  })
  name: string;

  constructor(data?: Partial<DisplayTypes>) {
    super(data);
  }
}

export interface DisplayTypesRelations {
  // describe navigational properties here
}

export type DisplayTypesWithRelations = DisplayTypes & DisplayTypesRelations;
