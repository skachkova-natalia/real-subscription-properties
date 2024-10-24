import {createDomain} from 'effector';
import {filtersDomain} from '@models/filters';
import {authService} from '@services/authService';
import {UserExtended} from '@src/types/user';

export const authDomain = createDomain();

export const loginFx = filtersDomain.createEffect(authService.login);
export const logoutFx = filtersDomain.createEffect(authService.logout);
export const registerFx = filtersDomain.createEffect(authService.register);
export const getUserInfoFx = filtersDomain.createEffect(authService.getUserInfo);

export const $user = filtersDomain.createStore<UserExtended | null>(null);
