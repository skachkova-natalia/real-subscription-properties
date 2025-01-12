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
} from '@models/propertyTable/filters';
import {$data, $error, getTableFx, getTableRow, getTableRowFx, tableDomain} from '@models/propertyTable/table/index';

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
  source: {substanceId: $currentSubstance, modeId: $currentMode},
  fn: ({substanceId, modeId}, params) => ({
    substanceId, modeId, params,
  } as TableFilters),
  target: getTableFx,
});

sample({
  clock: getTableRow,
  source: {substanceId: $currentSubstance, modeId: $currentMode, appliedFilters: $appliedFilters},
  fn: ({substanceId, modeId, appliedFilters}, params) => ({
    substanceId, modeId, params: {...appliedFilters, ...params},
  } as TableRowFilters),
  target: getTableRowFx,
});
