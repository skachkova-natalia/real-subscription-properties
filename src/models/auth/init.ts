import {resetDomainStoresByEvents} from '@utils/effector';
import {authDomain, getUserInfoFx} from '@models/auth/index';
import {AppGate} from '@models/app';
import {sample} from 'effector';

resetDomainStoresByEvents(authDomain, AppGate.close);

sample({
  clock: AppGate.open,
  target: getUserInfoFx,
})
