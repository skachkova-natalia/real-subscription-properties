import {resetDomainStoresByEvents} from '@utils/effector';
import {
  sendVerifyEmail,
  sendVerifyEmailErrorFx,
  sendVerifyEmailFx,
  sendVerifyEmailSuccessFx,
  userAccountDomain,
} from '@models/userAccount/index';
import {AppGate} from '@models/app';
import {sample} from 'effector';

resetDomainStoresByEvents(userAccountDomain, AppGate.close);

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
