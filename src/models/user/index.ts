import {combine, createDomain} from 'effector';
import {userService} from '@services/userService';
import {showErrorNotification, showSuccessNotification} from '@utils/notification';
import {SendChangeEmailParams} from '@src/types/user';
import {ApiResponseError} from '@core/api';
import {ErrorDescription} from '@src/types/common';

export const userDomain = createDomain();

export const sendVerifyEmailFx = userDomain.createEffect<typeof userService.sendVerifyEmail, ApiResponseError>(userService.sendVerifyEmail);
export const sendChangeEmailFx = userDomain.createEffect<typeof userService.sendChangeEmail, ApiResponseError>(userService.sendChangeEmail);
export const sendResetPasswordFx = userDomain.createEffect<typeof userService.sendResetPassword, ApiResponseError>(userService.sendResetPassword);

export const sendVerifyEmailSuccessFx = userDomain.createEffect({handler: () => showSuccessNotification('Письмо для подтверждения учётной записи было отправлено на почту')});
export const sendChangeEmailSuccessFx = userDomain.createEffect({handler: () => showSuccessNotification('Письмо было отправлено на указанную почту')});
export const sendResetPasswordSuccessFx = userDomain.createEffect({handler: () => showSuccessNotification('Письмо для сброса пароля было отправлено на почту')});
export const errorFx = userDomain.createEffect({handler: () => showErrorNotification('Что-то пошло не так. Попробуйте ещё раз.')});

export const sendVerifyEmail = userDomain.createEvent();
export const sendChangeEmail = userDomain.createEvent<SendChangeEmailParams>();
export const sendResetPassword = userDomain.createEvent();

export const $sendingChangeEmail = sendChangeEmailFx.pending;
export const $sendingResetPassword = sendResetPasswordFx.pending;
export const $changeEmailError = userDomain.createStore<ErrorDescription | null>(null);

export const $changingEmail = combine({
  sending: $sendingChangeEmail,
  error: $changeEmailError,
})
