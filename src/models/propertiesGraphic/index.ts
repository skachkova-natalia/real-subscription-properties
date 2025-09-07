import {combine, createDomain} from 'effector';
import {propertyGraphicService} from '@services/propertyGraphicService';
import {GraphicFiltersParams} from '@src/types/graphic';
import {ApiResponseError} from '@core/api';
import {ErrorDescription} from '@src/types/common';

export const graphicDomain = createDomain();

export const getPropertyPointsFx = graphicDomain.createEffect<typeof propertyGraphicService.getPropertyPoints, ApiResponseError>(propertyGraphicService.getPropertyPoints);

export const getPropertyPoints = graphicDomain.createEvent<GraphicFiltersParams>();
export const setSelectedProperty = graphicDomain.createEvent<string>();
export const setVariableParameter = graphicDomain.createEvent<string>();
export const setFixedParameter = graphicDomain.createEvent< string>();
export const setFixedParameterValues = graphicDomain.createEvent<{[key: string]: string}>();
export const resetPoints = graphicDomain.createEvent();

export const $points = graphicDomain.createStore<{[key: string]: number}[]>([]);
export const $selectedProperty = graphicDomain.createStore<string>('');
export const $variableParameter = graphicDomain.createStore<string>('');
export const $fixedParameter = graphicDomain.createStore<string>('');
export const $fixedParameterValues = graphicDomain.createStore<{[key: string]: string}>({});
export const $error = graphicDomain.createStore<ErrorDescription | null>(null);

export const $graphic = combine({
  points: $points,
  selectedProperty: $selectedProperty,
  variableParameter: $variableParameter,
  fixedParameterValues: $fixedParameterValues,
  fixedParameter: $fixedParameter,
  error: $error,
  loading: getPropertyPointsFx.pending,
});
