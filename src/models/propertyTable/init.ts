import {resetDomainStoresByEvents} from '@utils/effector';
import {$propertyTable, getTableFx, tableDomain} from '@models/propertyTable/index';
import {AppGate} from '@models/app';
import {sample} from 'effector';
import {$currentMode, $currentSubstance, applyFilters, setCurrentMode, setCurrentSubstance} from '@models/filters';
import {TableFilters} from '@src/types/filters';

resetDomainStoresByEvents(tableDomain, AppGate.close);

$propertyTable
  .on(getTableFx.doneData, (state, payload)=>payload.data)
  .reset(setCurrentSubstance, setCurrentMode, applyFilters);

sample({
  clock: applyFilters,
  source: {substanceId: $currentSubstance, modeId: $currentMode},
  fn: ({substanceId, modeId}, params) => ({
    substanceId, modeId, params,
  } as TableFilters),
  target: getTableFx
});
