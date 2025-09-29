import {combine, createDomain} from 'effector';
import {authService} from '@services/authService';
import {User, UserFull} from '@src/types/user';
import {Tokens} from '@src/types/auth';
import {ErrorDescription} from '@src/types/common';
import {ApiResponseError} from '@core/api';

export const authDomain = createDomain();

export const loginFx = authDomain.createEffect<typeof authService.login, ApiResponseError>(authService.login);
export const getUserInfoFx = authDomain.createEffect(authService.getUserInfo);

export const login = authDomain.createEvent<User>();

export const $user = authDomain.createStore<UserFull | null>(null);
export const $isRegistered = authDomain.createStore<boolean>(false);
export const $tokens = authDomain.createStore<Tokens>({access_token: '', refresh_token: '', token_type: ''});
export const $loginError = authDomain.createStore<ErrorDescription | null>(null);

export const $loginPage = combine({
  isRegistered: $isRegistered,
  error: $loginError,
})
