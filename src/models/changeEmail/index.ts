import {combine, createDomain} from 'effector';
import {ErrorDescription} from '@src/types/common';
import {ApiResponseError} from '@core/api';
import {createGate} from 'effector-react';
import {userService} from '@services/userService';
import {ChangeEmailParams} from '@src/types/user';

export const ChangeEmailPageGate = createGate();

export const changeEmailPageDomain = createDomain();

export const changeEmailFx = changeEmailPageDomain.createEffect<typeof userService.changeEmail, ApiResponseError>(userService.changeEmail);

export const changeEmail = changeEmailPageDomain.createEvent<ChangeEmailParams>();

export const $changeEmailError = changeEmailPageDomain.createStore<ErrorDescription | null>(null);
export const $changeEmailSuccess = changeEmailPageDomain.createStore<boolean>(false);

export const $changeEmailPage = combine({
  error: $changeEmailError,
  loading: changeEmailFx.pending,
  success: $changeEmailSuccess,
});
