import {sample} from 'effector';
import {resetDomainStoresByEvents} from '@utils/effector';
import {TableFilters, TableRowFilters} from '@src/types/filters';
import {AppGate} from '@models/app';
import {
  $appliedFilters,
  $currentMode,
  $currentSubstance,
  applyFilters,
  setCurrentMode,
  setCurrentSubstance,
} from '@models/filters';
import {$data, $error, getTableFx, getTableRow, getTableRowFx, tableDomain} from '@models/propertiesTable/index';

resetDomainStoresByEvents(tableDomain, AppGate.close);

$data
  .on(getTableFx.doneData, (_, payload) => payload.data.map((item) => ({...item, key: item.property_literal})))
  // .on(getTableRowFx.doneData, (state, payload) => state.map((item) => {
  //     if (item.propertyId === payload.data?.propertyId) {
  //       return {...item, value: payload.data.value, dimension: payload.data.dimension};
  //     }
  //     return item;
  //   }),
  // )
  .reset(setCurrentSubstance, setCurrentMode, applyFilters);
$error
  .on(getTableFx.failData, (_, payload) => payload.detail)
  .reset(setCurrentSubstance, setCurrentMode, applyFilters, getTableFx.doneData);

sample({
  clock: applyFilters,
  source: {substance_name: $currentSubstance, mode_name: $currentMode},
  fn: ({substance_name, mode_name}, params) => ({
    substance_name, mode_name, params,
  } as TableFilters),
  target: getTableFx,
});

sample({
  clock: getTableRow,
  source: {substance_name: $currentSubstance, mode_name: $currentMode, appliedFilters: $appliedFilters},
  fn: ({substance_name, mode_name, appliedFilters}, property) => ({
    substance_name, mode_name, property, params: appliedFilters,
  } as TableRowFilters),
  target: getTableRowFx,
});
