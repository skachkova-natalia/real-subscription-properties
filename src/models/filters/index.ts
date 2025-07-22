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

export const filtersDomain = createDomain();

export const getAvailableSubstanceFx = filtersDomain.createEffect(propertyTableService.getAvailableSubstance);
export const getCalcModesInfoFx = filtersDomain.createEffect(propertyTableService.getCalcModesInfo);
export const getPropertiesListFx = filtersDomain.createEffect(propertyTableService.getPropertiesList);

export const $substances = filtersDomain.createStore<Substance[]>([]);
export const $substancesOptions = filtersDomain.createStore<Option[]>([]);
export const $currentSubstance = filtersDomain.createStore<string | null>(null);
export const $modes = filtersDomain.createStore<Mode[]>([]);
export const $modesOptions = filtersDomain.createStore<Option[]>([]);
export const $currentMode = filtersDomain.createStore<string | null>(null);
export const $modesParams = filtersDomain.createStore<Parameter[]>([]);
export const $propertiesList = filtersDomain.createStore<PropertyItem[]>([]);
export const $selectedProperties = filtersDomain.createStore<string[]>([]);
export const $appliedFilters = filtersDomain.createStore<TableParamFilters[]>([]);

export const setCurrentSubstance = filtersDomain.createEvent<string>();
export const setCurrentMode = filtersDomain.createEvent<string>();
export const setSelectedProperties = filtersDomain.createEvent<string[]>();
export const applyFilters = filtersDomain.createEvent<TableParamFilters[]>();

export const $filters = combine({
  substancesOptions: $substancesOptions,
  loadingSubstances: getAvailableSubstanceFx.pending,
  currentSubstance: $currentSubstance,
  modesParams: $modesParams,
  loadingModesParams: getCalcModesInfoFx.pending,
  modesOptions: $modesOptions,
  currentMode: $currentMode,
  propertiesList: $propertiesList,
  selectedProperties: $selectedProperties,
});
