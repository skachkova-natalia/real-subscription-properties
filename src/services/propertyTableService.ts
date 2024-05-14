import {bindAllMethods} from '@utils/binder';
import {axiosApiInstance} from '@core/api';

export const propertyTableService = bindAllMethods({
  async getAvailableSubstance(): Promise<void> {
    return (
      await axiosApiInstance.get(`http://rsp-api.online/getAvailableSubstances`)
    ).data;
  },
  async getTable(): Promise<void> {
    return (
      await axiosApiInstance.get(`http://rsp-api.online/getAvailableSubstance`)
    ).data;
  },
})
