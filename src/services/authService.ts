import {bindAllMethods} from '@utils/binder';
import {axiosApiInstance, BASE_URL} from '@core/api';
import {User, UserExtended} from '@src/types/user';

export const authService = bindAllMethods({
  async login(params: User): Promise<void> {
    return (
      await axiosApiInstance.post(`${BASE_URL}/login/token`, params)
    ).data;
  },
  async register(params: UserExtended): Promise<void> {
    return (
      await axiosApiInstance.post(`${BASE_URL}/user`, params)
    ).data;
  },
  async logout(): Promise<void> {
    return (
      await axiosApiInstance.post(`${BASE_URL}/auth/logout`)
    ).data;
  },
  async getUserInfo(): Promise<UserExtended> {
    return (
      await axiosApiInstance.get(`${BASE_URL}/users/me`)
    ).data;
  },
});
