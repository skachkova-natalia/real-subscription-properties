import {forwardPayload, resetDomainStoresByEvents} from '@utils/effector';
import {AppGate} from '@models/app';
import {$points, getPropertyPoints, getPropertyPointsFx, graphicDomain} from '@models/propertiesGraphic/index';
import {sample} from 'effector';

resetDomainStoresByEvents(graphicDomain, AppGate.close);

$points.on(getPropertyPointsFx.doneData, forwardPayload());

sample({
  clock: getPropertyPoints,
  target: getPropertyPointsFx,
})
