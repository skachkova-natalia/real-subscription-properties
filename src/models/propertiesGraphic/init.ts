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

$points
  .on(getPropertyPointsFx.doneData, (_, payload) => payload.data)
  .reset(resetPoints, setSelectedProperty, setVariableParameter, getPropertyPointsFx.failData, setCurrentMode, setCurrentSubstance);
$selectedProperty.on(setSelectedProperty, forwardPayload());
$variableParameter.on(setVariableParameter, forwardPayload());
$fixedParameter.on(setFixedParameter, forwardPayload());
$fixedParameterValues.on(setFixedParameterValues, forwardPayload()).reset(resetPoints, setSelectedProperty, setVariableParameter);
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

