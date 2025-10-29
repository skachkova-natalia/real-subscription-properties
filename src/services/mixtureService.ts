import {bindAllMethods} from '@utils/binder';
import {axiosApiInstance, BASE_URL} from '@core/api';
import {Mixture} from '@src/types/mxture';

export const mixtureService = bindAllMethods({
  async addNewMixture(params: Mixture): Promise<void> {
    return (
      await axiosApiInstance.post(`${BASE_URL}/add_phase`, params)
    ).data;
  },
});
