import {forwardPayload, resetDomainStoresByEvents} from '@utils/effector';
import {$tokens, $user, authDomain, getUserInfoFx, login, loginFx, register, registerFx} from '@models/auth/index';
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
