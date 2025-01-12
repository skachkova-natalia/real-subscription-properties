import {forwardPayload, resetDomainStoresByEvents} from '@utils/effector';
import {
  $appliedFilters,
  $currentMode,
  $currentSubstance,
  $modesOptions,
  $modesParams,
  $propertiesList,
  $selectedProperties,
  $substancesOptions,
  applyFilters,
  filtersDomain,
  getAvailableSubstanceFx,
  getCalcModesInfoFx,
  getPropertiesListFx,
  setCurrentMode,
  setCurrentSubstance,
  setSelectedProperties,
} from '@models/propertyTable/filters/index';
import {AppGate} from '@models/app';
import {sample} from 'effector';
import {PropertiesFilters} from '@src/types/filters';

resetDomainStoresByEvents(filtersDomain, AppGate.close);

$substancesOptions.on(getAvailableSubstanceFx.doneData, (_, payload) => payload.data);
$currentSubstance.on(setCurrentSubstance, forwardPayload());
$modesParams
  .on(getCalcModesInfoFx.doneData, (_, payload) => payload.data)
  .reset(setCurrentSubstance);
$modesOptions
  .on(getCalcModesInfoFx.doneData, (_, payload) => payload.data.map((filter) => ({
    value: filter.value,
    label: `f(${filter.value.split('').join(',')})`,
  })))
  .reset(setCurrentSubstance);
$currentMode
  .on(setCurrentMode, forwardPayload())
  .reset(setCurrentSubstance);
$propertiesList
  .on(getPropertiesListFx.doneData, (_, payload) => payload.data)
  .reset(setCurrentSubstance, setCurrentMode);
$selectedProperties
  .on(setSelectedProperties, forwardPayload())
  .on(getPropertiesListFx.doneData, (_, payload) => Object.keys(payload.data))
  .reset(setCurrentSubstance, setCurrentMode);
$appliedFilters.on(applyFilters, forwardPayload());

sample({
  clock: AppGate.open,
  target: getAvailableSubstanceFx,
});

sample({
  clock: setCurrentSubstance,
  target: getCalcModesInfoFx,
});

sample({
  clock: setCurrentMode,
  source: $currentSubstance,
  fn: (substanceId, modeId) => ({substanceId, modeId} as PropertiesFilters),
  target: getPropertiesListFx,
});
