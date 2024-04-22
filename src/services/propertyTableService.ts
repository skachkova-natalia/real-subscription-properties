import {bindAllMethods} from '@utils/binder';
import {axiosApiInstance, BASE_URL} from '@core/api';

export const propertyTableService = bindAllMethods({
  async getTable(): Promise<void> {
    return (
      await axiosApiInstance.get(`${BASE_URL}/product`)
    ).data;
  },
})
