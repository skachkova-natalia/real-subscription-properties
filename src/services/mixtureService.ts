import {bindAllMethods} from '@utils/binder';
import {axiosApiInstance, BASE_URL} from '@core/api';
import {Mixture, MixturesResponse} from '@src/types/mixture';

export const mixtureService = bindAllMethods({
  async addNewMixture(params: Mixture): Promise<void> {
    return (
      await axiosApiInstance.post(`${BASE_URL}/add_phase`, params)
    ).data;
  },
  async deleteMixture(phase_id: string): Promise<void> {
    return (
      await axiosApiInstance.post(`${BASE_URL}/delete_phase?phase_id=${phase_id}`)
    ).data;
  },
  async getUsersMixtures(): Promise<MixturesResponse> {
    return (
      await axiosApiInstance.get(`${BASE_URL}/get_users_phase`)
    ).data;
  },
});
