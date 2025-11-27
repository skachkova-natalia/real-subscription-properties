import {sample} from 'effector';
import {resetDomainStoresByEvents} from '@utils/effector';
import {TableFilters, TableRowFilters} from '@src/types/filters';
import {AppGate} from '@models/app';
import {
  $appliedFilters,
  $currentMode,
  $currentSubstance,
  $isMixture,
  applyFilters,
  setCurrentMode,
  setCurrentSubstance,
} from '@models/filters';
import {
  $data,
  $error,
  getMixtureTableFx, getMixtureTableRowFx,
  getTableFx,
  getTableRow,
  getTableRowFx,
  tableDomain,
} from '@models/propertiesTable/index';

resetDomainStoresByEvents(tableDomain, AppGate.close);

$data
  .on([getTableFx.doneData, getMixtureTableFx.doneData], (_, payload) => payload.data.map((item) => ({...item, key: item.property_literal})))
  .on([getTableRowFx.doneData, getMixtureTableRowFx.doneData], (state, payload) => state.map((item) => {
      if (item.property_literal === payload.data?.property_literal) {
        return {...item, value: payload.data.value, dimension: payload.data.dimension};
      }
      return item;
    }),
  )
  .reset(setCurrentSubstance, setCurrentMode, applyFilters);
$error
  .on([getTableFx.failData, getMixtureTableFx.failData], (_, payload) => payload.detail)
  .reset(setCurrentSubstance, setCurrentMode, applyFilters, getTableFx.doneData, getMixtureTableFx.doneData);

sample({
  clock: applyFilters,
  source: {currentSubstance: $currentSubstance, currentMode: $currentMode, isMixture: $isMixture},
  filter: ({isMixture}) => !isMixture,
  fn: ({currentSubstance, currentMode}, params) => ({
    substance_name: currentSubstance,
    mode_name: currentMode,
    params,
  } as TableFilters),
  target: getTableFx,
});

sample({
  clock: applyFilters,
  source: {currentSubstance: $currentSubstance, currentMode: $currentMode, isMixture: $isMixture},
  filter: ({isMixture}) => isMixture,
  fn: ({currentSubstance, currentMode}, params) => ({
    substance_name: currentSubstance,
    mode_name: currentMode,
    params,
  } as TableFilters),
  target: getMixtureTableFx,
});

sample({
  clock: getTableRow,
  source: {currentSubstance: $currentSubstance, currentMode: $currentMode, appliedFilters: $appliedFilters, isMixture: $isMixture},
  filter: ({isMixture}) => !isMixture,
  fn: ({currentSubstance, currentMode, appliedFilters}, property) => ({
    substance_name: currentSubstance,
    mode_name: currentMode,
    property,
    params: appliedFilters,
  } as TableRowFilters),
  target: getTableRowFx,
});

sample({
  clock: getTableRow,
  source: {currentSubstance: $currentSubstance, currentMode: $currentMode, appliedFilters: $appliedFilters, isMixture: $isMixture},
  filter: ({isMixture}) => isMixture,
  fn: ({currentSubstance, currentMode, appliedFilters}, property) => ({
    substance_name: currentSubstance,
    mode_name: currentMode,
    property,
    params: appliedFilters,
  } as TableRowFilters),
  target: getMixtureTableRowFx,
});
