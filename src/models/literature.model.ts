import {belongsTo, Entity, model, property} from '@loopback/repository';
import {DisplayTypes} from './display-types.model';

@model({
  name: 'literature',
})
export class Literature extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'string',
    name: 'paper_author',
  })
  paperAuthor?: string;

  @property({
    type: 'string',
    name: 'paper_title',
  })
  paperTitle?: string;

  @property({
    type: 'string',
    name: 'series_source',
  })
  seriesSource?: string;

  @property({
    type: 'string',
  })
  volume?: string;

  @property({
    type: 'string',
  })
  issue?: string;

  @property({
    type: 'string',
  })
  publisher?: string;

  @property({
    type: 'string',
  })
  editor?: string;

  @property({
    type: 'string',
  })
  year?: string;

  @property({
    type: 'string',
  })
  pages?: string;

  @property({
    type: 'string',
    name: 'journal_name',
  })
  journalName?: string;

  @belongsTo(() => DisplayTypes, {name: 'displayTypeText'}, {
    name: 'display_type',
  })
  displayType: number;

  constructor(data?: Partial<Literature>) {
    super(data);
  }
}

export interface LiteratureRelations {
  // describe navigational properties here
}

export type LiteratureWithRelations = Literature & LiteratureRelations;
