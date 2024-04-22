import {createDomain} from 'effector';
import {propertyTableService} from '@services/propertyTableService';

export const tableDomain = createDomain();

export const getTableFx = tableDomain.createEffect(propertyTableService.getTable);

export const $propertyTable = tableDomain.createStore([]);
