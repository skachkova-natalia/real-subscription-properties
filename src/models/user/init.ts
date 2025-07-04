import {resetDomainStoresByEvents} from '@utils/effector';
import {
  sendVerifyEmail,
  errorFx,
  sendVerifyEmailFx,
  sendVerifyEmailSuccessFx,
  userDomain,
  sendChangeEmailFx,
  sendChangeEmailSuccessFx,
  sendChangeEmail,
  sendResetPassword,
  sendResetPasswordFx,
  sendResetPasswordSuccessFx,
} from '@models/user/index';
import {AppGate} from '@models/app';
import {sample} from 'effector';
import {$user} from '@models/auth';

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
  clock: sendResetPassword,
  source: $user,
  filter: (user) => !!user?.email,
  fn: (user) => user?.email || '',
  target: sendResetPasswordFx,
});

sample({
  clock: sendResetPasswordFx.done,
  target: sendResetPasswordSuccessFx,
});

sample({
  clock: [sendVerifyEmailFx.fail, sendChangeEmailFx.fail, sendResetPasswordFx.fail],
  target: errorFx,
});
