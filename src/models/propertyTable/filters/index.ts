import {combine, createDomain} from 'effector';
import {propertyTableService} from '@services/propertyTableService';
import {Filter, Mode, PropertyDescription, TableParamsFilters} from '@src/types/filters';

export const filtersDomain = createDomain();

export const getAvailableSubstanceFx = filtersDomain.createEffect(propertyTableService.getAvailableSubstance);
export const getCalcModesInfoFx = filtersDomain.createEffect(propertyTableService.getCalcModesInfo);
export const getPropertiesListFx = filtersDomain.createEffect(propertyTableService.getPropertiesList);

export const $substancesOptions = filtersDomain.createStore<Filter[]>([]);
export const $currentSubstance = filtersDomain.createStore<string | null>(null);
export const $modesOptions = filtersDomain.createStore<Filter[]>([]);
export const $currentMode = filtersDomain.createStore<string | null>(null);
export const $modesParams = filtersDomain.createStore<Mode[]>([]);
export const $propertiesList = filtersDomain.createStore<PropertyDescription>({});
export const $selectedProperties = filtersDomain.createStore<string[]>([]);
export const $appliedFilters = filtersDomain.createStore<TableParamsFilters>({param_values: [], param_dimensions: []});

export const setCurrentSubstance = filtersDomain.createEvent<string>();
export const setCurrentMode = filtersDomain.createEvent<string>();
export const setSelectedProperties = filtersDomain.createEvent<string[]>();
export const applyFilters = filtersDomain.createEvent<TableParamsFilters>({});

export const $filters = combine({
  substancesOptions: $substancesOptions,
  currentSubstance: $currentSubstance,
  modesParams: $modesParams,
  modesOptions: $modesOptions,
  currentMode: $currentMode,
  propertiesList: $propertiesList,
  selectedProperties: $selectedProperties,
});
