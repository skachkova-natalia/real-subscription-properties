import {combine, createDomain} from 'effector';
import {propertyTableService} from '@services/propertyTableService';

export const filtersDomain = createDomain();

export const getAvailableSubstanceFx = filtersDomain.createEffect(propertyTableService.getAvailableSubstance);

export const $substances = filtersDomain.createStore([]);

export const $filters = combine({
  substances: $substances,
});
