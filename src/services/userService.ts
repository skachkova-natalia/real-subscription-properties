import {bindAllMethods} from '@utils/binder';
import {axiosApiInstance, BASE_URL} from '@core/api';
import {ChangeEmailParams, SendChangeEmailParams, UserFull} from '@src/types/user';
import {Tokens} from '@src/types/auth';

export const userService = bindAllMethods({
  async sendVerifyEmail(): Promise<Tokens> {
    return (
      await axiosApiInstance.get(`${BASE_URL}/auth/verify_user_request`)
    ).data;
  },

  async verifyEmail(): Promise<Tokens> {
    return (
      await axiosApiInstance.get(`${BASE_URL}/auth/verify_user`)
    ).data;
  },

  async changeEmail(params: ChangeEmailParams): Promise<void> {
    return (
      await axiosApiInstance.post(`${BASE_URL}/auth/change_email_user`, params)
    ).data;
  },

  async sendChangeEmail(params: SendChangeEmailParams): Promise<void> {
    return (
      await axiosApiInstance.post(`${BASE_URL}/auth/change_email_user_request`, params)
    ).data;
  },

  async resetPassword(): Promise<UserFull> {
    return (
      await axiosApiInstance.get(`${BASE_URL}/auth/recovery_account`)
    ).data;
  },
});
