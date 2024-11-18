import {resetDomainStoresByEvents} from '@utils/effector';
import {authDomain, getUserInfoFx, login, loginFx, register, registerFx} from '@models/auth/index';
import {AppGate} from '@models/app';
import {sample} from 'effector';

resetDomainStoresByEvents(authDomain, AppGate.close);

sample({
  clock: [AppGate.open, loginFx.doneData, registerFx.doneData],
  target: getUserInfoFx,
})

sample({
  clock: login,
  target: loginFx,
})

sample({
  clock: register,
  target: registerFx,
})
