import {bindAllMethods} from '@utils/binder';
import {axiosApiInstance, BASE_URL} from '@core/api';
import {GraphicParams, Points} from '@src/types/graphic';

export const propertyGraphicService = bindAllMethods({
  async getPropertyPoints(params: GraphicParams): Promise<Points> {
    return (
      await axiosApiInstance.post(`${BASE_URL}/get_table_for_property`, params)
    ).data;
  },
});
