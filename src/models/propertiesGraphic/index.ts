import {combine, createDomain} from 'effector';
import {propertyGraphicService} from '@services/propertyGraphicService';
import {GraphicFiltersParams, GraphicPoint} from '@src/types/graphic';
import {ApiResponseError} from '@core/api';
import {ErrorDescription} from '@src/types/common';

export const graphicDomain = createDomain();

export const getPropertyPointsFx = graphicDomain.createEffect<typeof propertyGraphicService.getPropertyPoints, ApiResponseError>(propertyGraphicService.getPropertyPoints);
export const getMixturePropertyPointsFx = graphicDomain.createEffect<typeof propertyGraphicService.getMixturePropertyPoints, ApiResponseError>(propertyGraphicService.getMixturePropertyPoints);

export const setFilters = graphicDomain.createEvent<GraphicFiltersParams>();
export const getPropertyPoints = graphicDomain.createEvent();
export const setSelectedProperty = graphicDomain.createEvent<string>();
export const setVariableParameter = graphicDomain.createEvent<string>();
export const setVariableParameterDimension = graphicDomain.createEvent<string>();
export const setFixedParameter = graphicDomain.createEvent<string>();
export const setFixedParameterDimension = graphicDomain.createEvent<string>();
export const setFixedParameterValues = graphicDomain.createEvent<string[]>();
export const resetPoints = graphicDomain.createEvent();

export const $filters = graphicDomain.createStore<GraphicFiltersParams | null>(null);
export const $points = graphicDomain.createStore<GraphicPoint>({});
export const $selectedProperty = graphicDomain.createStore<string>('');
export const $variableParameter = graphicDomain.createStore<string>('');
export const $variableParameterDimension = graphicDomain.createStore<string>('');
export const $fixedParameter = graphicDomain.createStore<string>('');
export const $fixedParameterDimension = graphicDomain.createStore<string>('');
export const $fixedParameterValues = graphicDomain.createStore<string[]>([]);
export const $error = graphicDomain.createStore<ErrorDescription | null>(null);

export const $graphic = combine({
  filters: $filters,
  points: $points,
  selectedProperty: $selectedProperty,
  variableParameter: $variableParameter,
  variableParameterDimension: $variableParameterDimension,
  fixedParameterValues: $fixedParameterValues,
  fixedParameter: $fixedParameter,
  fixedParameterDimension: $fixedParameterDimension,
  error: $error,
  loading: getPropertyPointsFx.pending,
});
