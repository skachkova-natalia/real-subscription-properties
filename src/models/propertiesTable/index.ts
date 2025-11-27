import {combine, createDomain} from 'effector';
import {ApiResponseError} from '@core/api';
import {PropertyItem} from '@src/types/table';
import {propertyTableService} from '@services/propertyTableService';
import {ErrorDescription} from '@src/types/common';
import {TableRowPropertyFilters} from '@src/types/filters';

export const tableDomain = createDomain();

export const getTableFx = tableDomain.createEffect<typeof propertyTableService.getTable,
  ApiResponseError>(propertyTableService.getTable);
export const getMixtureTableFx = tableDomain.createEffect<typeof propertyTableService.getTable,
  ApiResponseError>(propertyTableService.getMixtureTable);
export const getTableRowFx = tableDomain.createEffect(propertyTableService.getTableRow);
export const getMixtureTableRowFx = tableDomain.createEffect(propertyTableService.getMixtureTableRow);

export const getTableRow = tableDomain.createEvent<TableRowPropertyFilters>();

export const $data = tableDomain.createStore<PropertyItem[]>([]);
export const $error = tableDomain.createStore<ErrorDescription | null>(null);

export const $propertiesTable = combine({
  data: $data,
  error: $error,
  loading: getTableFx.pending || getMixtureTableFx.pending,
});
