import {createDomain} from 'effector';
import {filtersDomain} from '@models/filters';
import {authService} from '@services/authService';
import {User, UserExtended} from '@src/types/user';

export const authDomain = createDomain();

export const loginFx = filtersDomain.createEffect(authService.login);
export const logoutFx = filtersDomain.createEffect(authService.logout);
export const registerFx = filtersDomain.createEffect(authService.register);
export const getUserInfoFx = filtersDomain.createEffect(authService.getUserInfo);

export const login = filtersDomain.createEvent<User>();
export const register = filtersDomain.createEvent<UserExtended>();

export const $user = filtersDomain.createStore<UserExtended | null>(null);
