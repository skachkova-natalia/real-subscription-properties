import {forwardPayload, resetDomainStoresByEvents} from '@utils/effector';
import {
  $loginError,
  $registerError,
  $tokens,
  $user,
  authDomain,
  getUserInfoFx,
  login,
  loginFx,
  register,
  registerFx,
} from '@models/auth/index';
import {AppGate} from '@models/app';
import {sample} from 'effector';

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
$registerError
  .on(registerFx.failData, (_, payload) => payload.detail)
  .reset(registerFx);
$loginError
  .on(loginFx.failData, (_, payload) => payload.detail)
  .reset(loginFx);

sample({
  clock: [AppGate.open, loginFx.doneData, registerFx.doneData],
  source: $tokens,
  filter: (tokens) => !!tokens.access_token,
  target: getUserInfoFx,
});

sample({
  clock: login,
  target: loginFx,
});

sample({
  clock: register,
  target: registerFx,
});
