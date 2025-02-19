import {combine, createDomain} from 'effector';
import {authService} from '@services/authService';
import {UserExtended} from '@src/types/user';
import {ErrorDescription} from '@src/types/common';
import {ApiResponseError} from '@core/api';
import {createGate} from 'effector-react';

export const RegisterPageGate = createGate();

export const registerPageDomain = createDomain();

export const registerFx = registerPageDomain.createEffect<typeof authService.register, ApiResponseError>(authService.register);

export const register = registerPageDomain.createEvent<UserExtended>();

export const $registerError = registerPageDomain.createStore<ErrorDescription | null>(null);

export const $registrationPage = combine({
  error: $registerError,
});
