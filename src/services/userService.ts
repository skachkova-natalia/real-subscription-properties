import {bindAllMethods} from '@utils/binder';
import {axiosApiInstance, BASE_URL} from '@core/api';
import {UserExtended, UserFull} from '@src/types/user';
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
  async changeEmail(params: UserExtended): Promise<void> {
    return (
      await axiosApiInstance.post(`${BASE_URL}/auth/change_email_user`, params)
    ).data;
  },
  async resetPassword(): Promise<UserFull> {
    return (
      await axiosApiInstance.get(`${BASE_URL}/auth/recovery_account`)
    ).data;
  },
});
