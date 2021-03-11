import {PropertyDefinition} from '@loopback/repository';
import {ListOfSpecies} from '../../models';

type Property = {
  [name: string]: PropertyDefinition;
};

const listOfSpeciesProperties = ListOfSpecies.definition.properties;

const getSearchDefaultOrder = (properties: Property) => {
  const searchDefaultOrder = Object.keys(
    properties,
  ).filter((key) => properties[key].defaultOrder);

  searchDefaultOrder.sort((a, b) => (
    properties[a].defaultOrder
      > properties[b].defaultOrder
      ? 1 : -1
  ));
  return searchDefaultOrder;
};

export function getListOfSpeciesDefaultOrder() {
  return getSearchDefaultOrder(listOfSpeciesProperties);
}

export function getInfraspecificFields() {
  return Object.keys(listOfSpeciesProperties)
    .filter((key) => listOfSpeciesProperties[key].infraspecific);
}
