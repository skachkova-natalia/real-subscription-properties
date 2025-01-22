import {createDomain} from 'effector';
import {authService} from '@services/authService';
import {User, UserExtended, UserFull} from '@src/types/user';
import {Tokens} from '@src/types/auth';

export const authDomain = createDomain();

export const loginFx = authDomain.createEffect(authService.login);
export const logoutFx = authDomain.createEffect(authService.logout);
export const registerFx = authDomain.createEffect(authService.register);
export const getUserInfoFx = authDomain.createEffect(authService.getUserInfo);

export const login = authDomain.createEvent<User>();
export const register = authDomain.createEvent<UserExtended>();

export const $user = authDomain.createStore<UserFull | null>(null);
export const $tokens = authDomain.createStore<Tokens>({access_token: '', refresh_token: '', token_type: ''});
