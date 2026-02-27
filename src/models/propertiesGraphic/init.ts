import {forwardPayload, resetDomainStoresByEvents} from '@utils/effector';
import {AppGate} from '@models/app';
import {
  $error,
  $filters,
  $fixedParameter,
  $fixedParameterValues,
  $points,
  $variableParameter,
  getMixturePropertyPointsFx,
  getPropertyPoints,
  getPropertyPointsFx,
  graphicDomain,
  resetPoints,
  setFilters,
  setFixedParameter,
  setFixedParameterValues,
  setSelectedProperty,
  setVariableParameter,
} from '@models/propertiesGraphic/index';
import {sample} from 'effector';
import {$isMixture, setCurrentMode, setCurrentSubstance} from '@models/filters';
import {GraphicFiltersParams, GraphicPoint, Point} from '@src/types/graphic';

resetDomainStoresByEvents(graphicDomain, AppGate.close);

$filters.on(setFilters, forwardPayload());
$points.reset(resetPoints, setSelectedProperty, setVariableParameter, getPropertyPointsFx.failData, getMixturePropertyPointsFx.failData, setCurrentMode, setCurrentSubstance);
$variableParameter.on(setVariableParameter, forwardPayload());
$fixedParameter.on(setFixedParameter, forwardPayload());
$fixedParameterValues.on(setFixedParameterValues, forwardPayload()).reset(resetPoints, setSelectedProperty, setVariableParameter);
$error
  .on([getPropertyPointsFx.failData, getMixturePropertyPointsFx.failData], (_, payload) => ({
    msg: {
      ru: payload?.detail?.msg.ru || '',
      en: payload?.detail?.msg.en || '',
    },
  }))
  .reset(getPropertyPoints);

sample({
  clock: getPropertyPoints,
  source: {isMixture: $isMixture, filters: $filters},
  filter: ({isMixture, filters}) => !isMixture && !!filters,
  fn: ({filters}) => filters as GraphicFiltersParams,
  target: getPropertyPointsFx,
});

sample({
  clock: getPropertyPoints,
  source: {isMixture: $isMixture, filters: $filters},
  filter: ({isMixture, filters}) => isMixture && !!filters,
  fn: ({filters}) => filters as GraphicFiltersParams,
  target: getMixturePropertyPointsFx,
});

sample({
  clock: [getPropertyPointsFx.doneData, getMixturePropertyPointsFx.doneData],
  source: {fixedValues: $fixedParameterValues, points: $points},
  fn: ({fixedValues, points}, response) => {
    const result: GraphicPoint = points;
    const value = fixedValues[fixedValues.length - 1];
    const props = Object.keys(response.data);

    props.forEach((prop) => {
      const existingData = result[prop] || {};
      const filteredExistingData = Object.keys(existingData)
        .filter(key => fixedValues.includes(key))
        .reduce((acc, key) => {
          acc[key] = existingData[key];
          return acc;
        }, {} as Record<string, Point[]>);

      result[prop] = {
        ...filteredExistingData,
        [value as string]: response.data[prop] as Point[],
      };
    });

    return result;
  },
  target: $points,
});

