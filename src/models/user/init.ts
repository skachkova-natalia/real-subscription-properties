import {resetDomainStoresByEvents} from '@utils/effector';
import {
  sendVerifyEmail,
  errorFx,
  sendVerifyEmailFx,
  sendVerifyEmailSuccessFx,
  userDomain, sendChangeEmailFx, sendChangeEmailSuccessFx, sendChangeEmail,
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
  clock: sendChangeEmail,
  target: sendChangeEmailFx,
});

sample({
  clock: sendChangeEmailFx.done,
  target: sendChangeEmailSuccessFx,
});

sample({
  clock: [sendVerifyEmailFx.fail, sendChangeEmailFx.fail],
  target: errorFx,
});
