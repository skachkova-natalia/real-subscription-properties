import {sample} from 'effector';
import {resetDomainStoresByEvents} from '@utils/effector';
import {TableFilters} from '@src/types/filters';
import {AppGate} from '@models/app';
import {
  $currentMode,
  $currentSubstance,
  applyFilters,
  setCurrentMode,
  setCurrentSubstance,
} from '@models/propertyTable/filters';
import {$data, $error, getTableFx, getTableRowFx, tableDomain} from '@models/propertyTable/table/index';

resetDomainStoresByEvents(tableDomain, AppGate.close);

$data
  .on(getTableFx.doneData, (_, payload) => payload.data.map((item) => ({...item, key: item.propertyId})))
  .on(getTableRowFx.doneData, (state, payload) => state.map((item) => {
      if (item.propertyId === payload.data?.propertyId) {
        return {...item, value: payload.data.value, dimension: payload.data.dimension};
      }
      return item;
    }),
  )
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

// sample({
//   clock: getTableRow,
//   source: {substance_name: $currentSubstance, mode_name: $currentMode, appliedFilters: $appliedFilters},
//   fn: ({substance_name, mode_name, appliedFilters}, params) => ({
//     substance_name, mode_name, params: {...appliedFilters, ...params},
//   } as TableRowFilters),
//   target: getTableRowFx,
// });
