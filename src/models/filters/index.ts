import {combine, createDomain} from 'effector';
import {propertyTableService} from '@services/propertyTableService';
import {
  Mode,
  Parameter,
  PropertyItem,
  Substance,
  TableParamFilters,
} from '@src/types/filters';
import {Option} from '@src/types/common';
import {mixtureService} from '@services/mixtureService';
import {MixtureExtended} from '@src/types/mixture';

export const filtersDomain = createDomain();

export const getAvailableSubstanceFx = filtersDomain.createEffect(propertyTableService.getAvailableSubstance);
export const getUsersMixturesFx = filtersDomain.createEffect(mixtureService.getUsersMixtures);
export const getCalcModesInfoFx = filtersDomain.createEffect(propertyTableService.getCalcModesInfo);
export const getMixtureCalcModesInfoFx = filtersDomain.createEffect(propertyTableService.getMixtureCalcModesInfo);
export const getPropertiesListFx = filtersDomain.createEffect(propertyTableService.getPropertiesList);
export const getMixturePropertiesListFx = filtersDomain.createEffect(propertyTableService.getMixturePropertiesList);

export const $substances = filtersDomain.createStore<Substance[]>([]);
export const $mixtures = filtersDomain.createStore<MixtureExtended[]>([]);
export const $substancesOptions = filtersDomain.createStore<Option[]>([]);
export const $mixturesOptions = filtersDomain.createStore<Option[]>([]);
export const $currentSubstance = filtersDomain.createStore<string | null>(null);
export const $isMixture = filtersDomain.createStore<boolean>(false);
export const $modes = filtersDomain.createStore<Mode[]>([]);
export const $modesOptions = filtersDomain.createStore<Option[]>([]);
export const $currentMode = filtersDomain.createStore<string | null>(null);
export const $modesParams = filtersDomain.createStore<Parameter[]>([]);
export const $propertiesList = filtersDomain.createStore<PropertyItem[]>([]);
export const $selectedProperties = filtersDomain.createStore<string[]>([]);
export const $appliedFilters = filtersDomain.createStore<TableParamFilters[]>([]);

export const setCurrentSubstance = filtersDomain.createEvent<string>();
export const setIsMixture = filtersDomain.createEvent<boolean>();
export const setCurrentMode = filtersDomain.createEvent<string>();
export const setSelectedProperties = filtersDomain.createEvent<string[]>();
export const applyFilters = filtersDomain.createEvent<TableParamFilters[]>();

export const $filters = combine({
  substancesOptions: $substancesOptions,
  mixturesOptions: $mixturesOptions,
  loadingSubstances: getAvailableSubstanceFx.pending,
  currentSubstance: $currentSubstance,
  modesParams: $modesParams,
  loadingModesParams: getCalcModesInfoFx.pending,
  modesOptions: $modesOptions,
  currentMode: $currentMode,
  propertiesList: $propertiesList,
  selectedProperties: $selectedProperties,
});
