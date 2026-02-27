import {forwardPayload, resetDomainStoresByEvents} from '@utils/effector';
import {
  $appliedFilters,
  $currentMode,
  $currentSubstance,
  $isMixture,
  $mixtures,
  $modes,
  $modesOptions,
  $modesParams,
  $propertiesList,
  $selectedProperties,
  $substances,
  $substancesOptions,
  applyFilters,
  deleteMixture,
  deleteMixtureFx,
  filtersDomain,
  getAvailableSubstanceFx,
  getCalcModesInfoFx,
  getMixtureCalcModesInfoFx,
  getMixturePropertiesListFx,
  getPropertiesListFx,
  getUsersMixturesFx,
  setCurrentMode,
  setCurrentSubstance,
  setIsMixture,
  setSelectedProperties,
} from '@models/filters/index';
import {AppGate, changeAppLanguage} from '@models/app';
import {sample} from 'effector';
import {PropertiesFilters} from '@src/types/filters';
import i18n from 'i18next';
import {addMixtureFx} from '@models/modals/addMixModal';
import {$user, getUserInfoFx} from '@models/auth';

resetDomainStoresByEvents(filtersDomain, AppGate.close);

$substances.on(getAvailableSubstanceFx.doneData, (_, payload) => payload.data);
$mixtures.on(getUsersMixturesFx.doneData, (_, payload) => payload.data);
$currentSubstance.on(setCurrentSubstance, forwardPayload());
$isMixture.on(setIsMixture, forwardPayload());
$modes.on([getCalcModesInfoFx.doneData, getMixtureCalcModesInfoFx.doneData], (_, payload) => payload.data);
$currentMode
  .on(setCurrentMode, forwardPayload())
  .reset(setCurrentSubstance);
$propertiesList
  .on([getPropertiesListFx.doneData, getMixturePropertiesListFx.doneData], (_, payload) => payload.data)
  .reset(setCurrentSubstance, setCurrentMode);
$selectedProperties
  .on(setSelectedProperties, forwardPayload())
  .on([getPropertiesListFx.doneData, getMixturePropertiesListFx.doneData], (_, payload) => payload.data.map((e) => e.literal))
  .reset(setCurrentSubstance, setCurrentMode);
$appliedFilters.on(applyFilters, forwardPayload());

sample({
  clock: AppGate.open,
  target: getAvailableSubstanceFx,
});

sample({
  clock: [AppGate.open, addMixtureFx.doneData, getUserInfoFx.doneData, deleteMixtureFx.doneData],
  source: $user,
  filter: (user) => !!user,
  target: getUsersMixturesFx,
});

sample({
  clock: [$mixtures, $substances, changeAppLanguage],
  source: {substances: $substances, mixtures: $mixtures},
  fn: ({substances, mixtures}) => [
    ...substances.map((substance) => ({
      value: substance.substance_name,
      label: `${substance[`name_${i18n.language}`]} (${substance.substance_name})`,
    })),
    ...mixtures.map((mixture) => ({
      value: mixture.phase_id.toString(),
      label: `${mixture.name} (${mixture.components.map((component) => `${component.name} - ${component.concentration}`).join(', ')})`,
      isMixture: true,
      name: mixture.name,
    })),
  ],
  target: $substancesOptions,
});

sample({
  clock: [$modes, changeAppLanguage],
  source: $modes,
  fn: (modes) => modes.map((mode) => ({
    value: mode.mode_name,
    label: `${mode.mode_name} - ${mode.description[`${i18n.language}`]}`,
  })),
  target: $modesOptions,
});

sample({
  clock: [$currentMode, changeAppLanguage, $modes],
  source: {modes: $modes, currentMode: $currentMode},
  fn: ({modes, currentMode}) => modes.find((mode) => mode.mode_name === currentMode)?.parameters || [],
  target: $modesParams,
});

sample({
  clock: setCurrentSubstance,
  source: $isMixture,
  filter: (isMixture) => !isMixture,
  fn: (_, substanceName) => substanceName,
  target: getCalcModesInfoFx,
});

sample({
  clock: setCurrentSubstance,
  source: $isMixture,
  filter: (isMixture) => isMixture,
  fn: (_, substanceName) => substanceName,
  target: getMixtureCalcModesInfoFx,
});

sample({
  clock: setCurrentMode,
  source: {currentSubstance: $currentSubstance, isMixture: $isMixture},
  filter: ({isMixture}) => !isMixture,
  fn: ({currentSubstance}, modeName) => ({substance_name: currentSubstance, mode_name: modeName} as PropertiesFilters),
  target: getPropertiesListFx,
});

sample({
  clock: setCurrentMode,
  source: {currentSubstance: $currentSubstance, isMixture: $isMixture},
  filter: ({isMixture}) => isMixture,
  fn: ({currentSubstance}, modeName) => ({substance_name: currentSubstance, mode_name: modeName} as PropertiesFilters),
  target: getMixturePropertiesListFx,
});

sample({
  clock: deleteMixture,
  target: deleteMixtureFx,
});
