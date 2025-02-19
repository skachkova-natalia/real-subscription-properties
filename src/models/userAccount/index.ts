import {createDomain} from 'effector';
import {userService} from '@services/userService';
import {showErrorNotification, showSuccessNotification} from '@utils/notification';

export const userAccountDomain = createDomain();

export const sendVerifyEmailFx = userAccountDomain.createEffect(userService.sendVerifyEmail);
export const sendVerifyEmailSuccessFx = userAccountDomain.createEffect({handler: () => showSuccessNotification('Письмо для подтверждения учётной записи было отправлено на почту')});
export const sendVerifyEmailErrorFx = userAccountDomain.createEffect({handler: () => showErrorNotification('Что-то пошло не так. Попробуйте ещё раз.')});
export const verifyEmailFx = userAccountDomain.createEffect(userService.verifyEmail);

export const sendVerifyEmail = userAccountDomain.createEvent();
