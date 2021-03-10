import {Synonyms} from '../../models';

export interface ListOfSpeciesSynonymsResponse {
  nomenclatoricSynonyms: Synonyms[];
  taxonomicSynonyms: Synonyms[];
}
