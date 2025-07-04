import {forwardPayload, resetDomainStoresByEvents} from '@utils/effector';
import {
  $isRegistered,
  $loginError,
  $tokens,
  $user,
  authDomain,
  getUserInfoFx,
  login,
  loginFx,
} from '@models/auth/index';
import {AppGate} from '@models/app';
import {sample} from 'effector';
import {registerFx} from '@models/registration';
import {changeEmailFx} from '@models/changeEmail';

resetDomainStoresByEvents(authDomain, AppGate.close);

$tokens
  .on(AppGate.open, () => {
    if (localStorage.getItem('token')) {
      return JSON.parse(localStorage.getItem('token') || '');
    }
  })
  .on(loginFx.doneData, (_, payload) => {
    localStorage.setItem('token', JSON.stringify(payload));
    return payload;
  });
$user.on(getUserInfoFx.doneData, forwardPayload());
$isRegistered
  .on(registerFx.done, () => true)
  .reset(loginFx.done);
$loginError
  .on(loginFx.failData, (_, payload) => payload.detail)
  .reset(loginFx);

sample({
  clock: [AppGate.open, loginFx.doneData, changeEmailFx.doneData],
  source: $tokens,
  filter: (tokens) => !!tokens.access_token,
  target: getUserInfoFx,
});

sample({
  clock: login,
  target: loginFx,
});
