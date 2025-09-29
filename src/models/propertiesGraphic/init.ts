import {forwardPayload, resetDomainStoresByEvents} from '@utils/effector';
import {AppGate} from '@models/app';
import {
  $error,
  $fixedParameter,
  $fixedParameterValues,
  $points,
  $selectedProperty,
  $variableParameter,
  getPropertyPoints,
  getPropertyPointsFx,
  graphicDomain,
  resetPoints,
  setFixedParameter,
  setFixedParameterValues,
  setSelectedProperty,
  setVariableParameter,
} from '@models/propertiesGraphic/index';
import {sample} from 'effector';
import {setCurrentMode, setCurrentSubstance} from '@models/filters';

resetDomainStoresByEvents(graphicDomain, AppGate.close);

$points.reset(resetPoints, setSelectedProperty, setVariableParameter, getPropertyPointsFx.failData, setCurrentMode, setCurrentSubstance);
$selectedProperty.on(setSelectedProperty, forwardPayload());
$variableParameter.on(setVariableParameter, forwardPayload());
$fixedParameter.on(setFixedParameter, forwardPayload());
$fixedParameterValues.on(setFixedParameterValues, (state, payload) => {
  const index = Object.keys(state).length + 1;
  const key = Object.keys(payload)?.[0];
  return ({...state, ...({[`${key}${index}`]: payload[key]})});
}).reset(resetPoints, setSelectedProperty, setVariableParameter);
$error
  .on(getPropertyPointsFx.failData, (_, payload) => ({
    msg: {
      ru: payload?.detail?.['msg_user_ru'] || '',
      en: payload?.detail?.['msg_user_en'] || '',
    },
  }))
  .reset(getPropertyPoints);

sample({
  clock: getPropertyPoints,
  target: getPropertyPointsFx,
});

// sample({
//   clock: getPropertyPointsFx.doneData,
//   source: {fixedParameters: $fixedParameterValues, points: $points},
//   fn: ({fixedParameters, points}, response) => {
//     const key = Object.keys(fixedParameters).pop();
//     let result: {[key: string]: number}[];
//     if (!points.length) {
//       result = response.data.map((point) => ({x: point.x, [`${key}`]: point.y}));
//     } else {
//       result = points.map((point, index) => ({...point, [`${key}`]: response.data[index].y}));
//     }
//     return result || [];
//   },
//   target: $points,
// });
