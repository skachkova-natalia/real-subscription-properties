import {forwardPayload, resetDomainStoresByEvents} from '@utils/effector';
import {
  $appliedFilters,
  $currentMode,
  $currentSubstance,
  $modes,
  $modesOptions,
  $modesParams,
  $propertiesList,
  $selectedProperties,
  $substances,
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
$currentSubstance.on(setCurrentSubstance, forwardPayload());
$modes.on(getCalcModesInfoFx.doneData, (_, payload) => payload.data);
$currentMode
  .on(setCurrentMode, forwardPayload())
  .reset(setCurrentSubstance);
$propertiesList
  .on(getPropertiesListFx.doneData, (_, payload) => payload.data)
  .reset(setCurrentSubstance, setCurrentMode);
$selectedProperties
  .on(setSelectedProperties, forwardPayload())
  .on(getPropertiesListFx.doneData, (_, payload) => payload.data.map((e) => e.literal))
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
});

sample({
  clock: [$modes, changeAppLanguage],
  source: $modes,
  fn: (modes) => modes.map((mode) => ({
    value: mode.mode_name,
    label: `${mode.mode_name} - ${mode[`description_${i18n.language}`]}`,
  })),
  target: $modesOptions,
});

sample({
  clock: [$currentMode, changeAppLanguage],
  source: {modes: $modes, currentMode: $currentMode},
  fn: ({modes, currentMode}) => modes.find((mode) => mode.mode_name === currentMode)?.parameters || [],
  target: $modesParams,
});

sample({
  clock: setCurrentSubstance,
  target: getCalcModesInfoFx,
});

sample({
  clock: setCurrentMode,
  source: $currentSubstance,
  fn: (substance_name, mode_name) => ({substance_name, mode_name} as PropertiesFilters),
  target: getPropertiesListFx,
});
