import {resetDomainStoresByEvents} from '@utils/effector';
import {$data, $error, getTableFx, tableDomain} from '@models/propertyTable/index';
import {AppGate} from '@models/app';
import {sample} from 'effector';
import {$currentMode, $currentSubstance, applyFilters, setCurrentMode, setCurrentSubstance} from '@models/filters';
import {TableFilters} from '@src/types/filters';

resetDomainStoresByEvents(tableDomain, AppGate.close);

$data
  .on(getTableFx.doneData, (state, payload) => payload.data)
  .reset(setCurrentSubstance, setCurrentMode, applyFilters);
$error
  .on(getTableFx.failData, (state, payload) => payload.error)
  .reset(setCurrentSubstance, setCurrentMode, applyFilters, getTableFx.doneData);

sample({
  clock: applyFilters,
  source: {substanceId: $currentSubstance, modeId: $currentMode},
  fn: ({substanceId, modeId}, params) => ({
    substanceId, modeId, params,
  } as TableFilters),
  target: getTableFx,
});
