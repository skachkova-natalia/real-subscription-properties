import {forwardPayload, resetDomainStoresByEvents} from '@utils/effector';
import {$substances, filtersDomain, getAvailableSubstanceFx} from '@models/filters/index';
import {AppGate} from '@models/app';
import {sample} from 'effector';

resetDomainStoresByEvents(filtersDomain, AppGate.close);

$substances.on(getAvailableSubstanceFx.doneData, forwardPayload());

sample({
  clock: AppGate.open,
  target: getAvailableSubstanceFx,
});
