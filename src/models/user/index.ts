import {createDomain} from 'effector';
import {userService} from '@services/userService';
import {showErrorNotification, showSuccessNotification} from '@utils/notification';

export const userDomain = createDomain();

export const sendVerifyEmailFx = userDomain.createEffect(userService.sendVerifyEmail);
export const sendVerifyEmailSuccessFx = userDomain.createEffect({handler: () => showSuccessNotification('Письмо для подтверждения учётной записи было отправлено на почту')});
export const sendVerifyEmailErrorFx = userDomain.createEffect({handler: () => showErrorNotification('Что-то пошло не так. Попробуйте ещё раз.')});
export const verifyEmailFx = userDomain.createEffect(userService.verifyEmail);

export const sendVerifyEmail = userDomain.createEvent();
