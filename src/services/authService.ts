import {bindAllMethods} from '@utils/binder';
import {axiosApiInstance, BASE_URL} from '@core/api';
import {User, UserExtended, UserFull} from '@src/types/user';
import {Tokens} from '@src/types/auth';

export const authService = bindAllMethods({
  async login(params: User): Promise<Tokens> {
    return (
      await axiosApiInstance.post(`${BASE_URL}/login/token?email=${params.email}&password=${params.password}`)
    ).data;
  },
  async register(params: UserExtended): Promise<void> {
    return (
      await axiosApiInstance.post(`${BASE_URL}/user/`, params)
    ).data;
  },
  async logout(): Promise<void> {
    return (
      await axiosApiInstance.post(`${BASE_URL}/auth/logout`)
    ).data;
  },
  async getUserInfo(): Promise<UserFull> {
    return (
      await axiosApiInstance.get(`${BASE_URL}/user/me`)
    ).data;
  },
});
