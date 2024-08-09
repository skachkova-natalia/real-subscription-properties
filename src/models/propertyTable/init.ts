import {sample} from 'effector';
import {resetDomainStoresByEvents} from '@utils/effector';
import {TableFilters} from '@src/types/filters';
import {AppGate} from '@models/app';
import {$currentMode, $currentSubstance, applyFilters, setCurrentMode, setCurrentSubstance} from '@models/filters';
import {$data, $error, getTableFx, tableDomain} from '@models/propertyTable/index';

resetDomainStoresByEvents(tableDomain, AppGate.close);

$data
  .on(getTableFx.doneData, (state, payload) => payload.data)
  .reset(setCurrentSubstance, setCurrentMode, applyFilters);
$error
  .on(getTableFx.failData, (state, payload) => payload.detail)
  .reset(setCurrentSubstance, setCurrentMode, applyFilters, getTableFx.doneData);

sample({
  clock: applyFilters,
  source: {substanceId: $currentSubstance, modeId: $currentMode},
  fn: ({substanceId, modeId}, params) => ({
    substanceId, modeId, params,
  } as TableFilters),
  target: getTableFx,
});
