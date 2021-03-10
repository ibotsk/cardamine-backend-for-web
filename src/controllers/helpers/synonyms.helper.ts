import {FilterBuilder, WhereBuilder} from '@loopback/filter';
import {Synonyms} from '../../models';
import {ListOfSpeciesRepository} from '../../repositories';

const whereSyntype = (syntype: number) => (
  (new WhereBuilder<Synonyms>()).eq('syntype', syntype).build()
);

export async function fetchSynonyms(
  repo: ListOfSpeciesRepository, id: number, syntype: number,
  withSubsynonyms = false,
): Promise<Synonyms[]> {
  const includeFilter = {
    relation: 'name',
    scope: {},
  };
  if (withSubsynonyms) {
    // TODO: subsynonymsNomenclatoric include all synonyms, not just of type 3
    includeFilter.scope = {
      include: [
        {
          relation: 'subsynonymsNomenclatoric',
          scope: {
            where: {syntype: 3},
          },
        },
      ],
    };
  }

  const fb = new FilterBuilder<Synonyms>();
  const filter = fb
    .include(includeFilter)
    .where(whereSyntype(syntype))
    .build();

  return repo.synonyms(id).find(filter);
}
