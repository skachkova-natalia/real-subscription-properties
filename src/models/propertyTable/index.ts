import {combine, createDomain} from 'effector';
import {propertyTableService} from '@services/propertyTableService';
import {PropertyItem} from '@src/types/table';
import {ApiResponseError} from '@core/api';

export const tableDomain = createDomain();

export const getTableFx = tableDomain.createEffect<
  typeof propertyTableService.getTable,
  ApiResponseError
  >(propertyTableService.getTable);

export const $data = tableDomain.createStore<PropertyItem[]>([]);
export const $error = tableDomain.createStore<string>('');

export const $propertyTable = combine({
  data: $data,
  error: $error,
  loading: getTableFx.pending
})
