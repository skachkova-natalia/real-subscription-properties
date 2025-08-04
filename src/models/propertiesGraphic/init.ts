import {resetDomainStoresByEvents} from '@utils/effector';
import {AppGate} from '@models/app';
import {$error, $points, getPropertyPoints, getPropertyPointsFx, graphicDomain} from '@models/propertiesGraphic/index';
import {sample} from 'effector';

resetDomainStoresByEvents(graphicDomain, AppGate.close);

$points.on(getPropertyPointsFx.doneData, (_, payload) => payload.data);
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
