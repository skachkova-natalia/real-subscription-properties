import {forwardPayload, resetDomainStoresByEvents} from '@utils/effector';
import {AppGate} from '@models/app';
import {
  $error,
  $fixedParameter,
  $fixedParameterValues,
  $points,
  $selectedProperty,
  $variableParameter, getMixturePropertyPointsFx,
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
import {$isMixture, setCurrentMode, setCurrentSubstance} from '@models/filters';

resetDomainStoresByEvents(graphicDomain, AppGate.close);

$points
  .on([getPropertyPointsFx.doneData, getMixturePropertyPointsFx.doneData], (_, payload) => payload.data)
  .reset(resetPoints, setSelectedProperty, setVariableParameter, getPropertyPointsFx.failData, getMixturePropertyPointsFx.failData, setCurrentMode, setCurrentSubstance);
$selectedProperty.on(setSelectedProperty, forwardPayload());
$variableParameter.on(setVariableParameter, forwardPayload());
$fixedParameter.on(setFixedParameter, forwardPayload());
$fixedParameterValues.on(setFixedParameterValues, forwardPayload()).reset(resetPoints, setSelectedProperty, setVariableParameter);
$error
  .on([getPropertyPointsFx.failData, getMixturePropertyPointsFx.failData], (_, payload) => ({
    msg: {
      ru: payload?.detail?.['msg_user_ru'] || '',
      en: payload?.detail?.['msg_user_en'] || '',
    },
  }))
  .reset(getPropertyPoints);

sample({
  clock: getPropertyPoints,
  source: $isMixture,
  filter: (isMixture) => !isMixture,
  fn: (_, params) => params,
  target: getPropertyPointsFx,
});

sample({
  clock: getPropertyPoints,
  source: $isMixture,
  filter: (isMixture) => isMixture,
  fn: (_, params) => params,
  target: getMixturePropertyPointsFx,
});

