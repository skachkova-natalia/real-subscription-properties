import {createDomain} from 'effector';
import {propertyTableService} from '@services/propertyTableService';
import {PropertyItem} from '@src/types/table';

export const tableDomain = createDomain();

export const getTableFx = tableDomain.createEffect(propertyTableService.getTable);

export const $propertyTable = tableDomain.createStore<PropertyItem[]>([]);
