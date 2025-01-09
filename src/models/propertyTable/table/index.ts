import {combine, createDomain} from 'effector';
import {ApiResponseError} from '@core/api';
import {TableRowParamsFilters} from '@src/types/filters';
import {PropertyItem, TableError} from '@src/types/table';
import {propertyTableService} from '@services/propertyTableService';

export const tableDomain = createDomain();

export const getTableFx = tableDomain.createEffect<typeof propertyTableService.getTable,
  ApiResponseError>(propertyTableService.getTable);
export const getTableRowFx = tableDomain.createEffect(propertyTableService.getTableRow);

export const setSelectedProperties = tableDomain.createEvent<string[]>();
export const getTableRow = tableDomain.createEvent<TableRowParamsFilters>();

export const $selectedProperties = tableDomain.createStore<string[]>([]);
export const $data = tableDomain.createStore<PropertyItem[]>([]);
export const $error = tableDomain.createStore<TableError | null>(null);

export const $propertyTable = combine({
  data: $data,
  error: $error,
  loading: getTableFx.pending,
});
