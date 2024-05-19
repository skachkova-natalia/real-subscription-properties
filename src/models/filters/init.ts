import {forwardPayload, resetDomainStoresByEvents} from '@utils/effector';
import {
  $currentMode,
  $currentSubstance,
  $modesOptions,
  $modesParams,
  $substancesOptions,
  filtersDomain,
  getAvailableSubstanceFx,
  getCalcModesInfoFx,
  setCurrentMode,
  setCurrentSubstance,
} from '@models/filters/index';
import {AppGate} from '@models/app';
import {sample} from 'effector';

resetDomainStoresByEvents(filtersDomain, AppGate.close);

$substancesOptions.on(getAvailableSubstanceFx.doneData, (state, payload) => payload.data);
$currentSubstance.on(setCurrentSubstance, forwardPayload());
$modesParams
  .on(getCalcModesInfoFx.doneData, (state, payload) => payload.data)
  .reset(setCurrentSubstance);
$modesOptions
  .on(getCalcModesInfoFx.doneData, (state, payload) => payload.data.map((filter) => ({
    value: filter.value,
    label: `f(${filter.value.split('').join(',')})`,
  })))
  .reset(setCurrentSubstance);
$currentMode
  .on(setCurrentMode, forwardPayload())
  .reset(setCurrentSubstance);

sample({
  clock: AppGate.open,
  target: getAvailableSubstanceFx,
});

sample({
  clock: setCurrentSubstance,
  target: getCalcModesInfoFx,
});
