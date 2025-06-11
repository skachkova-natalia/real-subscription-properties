import {forwardPayload, resetDomainStoresByEvents} from '@utils/effector';
import {
  $appliedFilters,
  $currentMode,
  $currentSubstance,
  $modesOptions,
  $modesParams,
  $propertiesList,
  $selectedProperties, $substances,
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
import {AppGate, changeAppLanguage} from '@models/app';
import {sample} from 'effector';
import {PropertiesFilters} from '@src/types/filters';
import i18n from 'i18next';

resetDomainStoresByEvents(filtersDomain, AppGate.close);

$substances.on(getAvailableSubstanceFx.doneData, (_, payload) => payload.data);
// $substancesOptions.on(getAvailableSubstanceFx.doneData, (_, payload) => payload.data.map((substance) => ({
//   value: substance.substance_name,
//   label: `${substance[`name_${i18n.language}`]} (${substance.substance_name})`,
// })));
$currentSubstance.on(setCurrentSubstance, forwardPayload());
$modesParams
  .on(getCalcModesInfoFx.doneData, (_, payload) => payload.data)
  .reset(setCurrentSubstance);
$modesOptions
  .on(getCalcModesInfoFx.doneData, (_, payload) => payload.data.map((mode) => ({
    value: mode.value,
    label: `f(${mode.value.split('').join(',')}) - ${mode.description}`,
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
  clock: [$substances, changeAppLanguage],
  source: $substances,
  fn: (substances) => substances.map((substance) => ({
    value: substance.substance_name,
    label: `${substance[`name_${i18n.language}`]} (${substance.substance_name})`,
  })),
  target: $substancesOptions,
})

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
