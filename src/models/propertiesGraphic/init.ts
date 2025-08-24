import {forwardPayload, resetDomainStoresByEvents} from '@utils/effector';
import {AppGate} from '@models/app';
import {
  $error,
  $points,
  $selectedProperty,
  getPropertyPoints,
  getPropertyPointsFx,
  graphicDomain, setSelectedProperty,
} from '@models/propertiesGraphic/index';
import {sample} from 'effector';

resetDomainStoresByEvents(graphicDomain, AppGate.close);

$points.on(getPropertyPointsFx.doneData, (_, payload) => payload.data);
$selectedProperty.on(setSelectedProperty, forwardPayload());
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
