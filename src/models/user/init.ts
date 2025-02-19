import {resetDomainStoresByEvents} from '@utils/effector';
import {
  sendVerifyEmail,
  sendVerifyEmailErrorFx,
  sendVerifyEmailFx,
  sendVerifyEmailSuccessFx,
  userDomain,
} from '@models/user/index';
import {AppGate} from '@models/app';
import {sample} from 'effector';

resetDomainStoresByEvents(userDomain, AppGate.close);

sample({
  clock: sendVerifyEmail,
  target: sendVerifyEmailFx,
});

sample({
  clock: sendVerifyEmailFx.done,
  target: sendVerifyEmailSuccessFx,
});

sample({
  clock: sendVerifyEmailFx.fail,
  target: sendVerifyEmailErrorFx,
});
