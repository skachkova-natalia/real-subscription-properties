import {bindAllMethods} from '@utils/binder';
import {axiosApiInstance, BASE_URL} from '@core/api';
import {GraphicFiltersParams, Points} from '@src/types/graphic';

export const propertyGraphicService = bindAllMethods({
  async getPropertyPoints(params: GraphicFiltersParams): Promise<Points> {
    return (
      await axiosApiInstance.post(`${BASE_URL}/get_table_for_property`, params)
    ).data;
  },
  async getMixturePropertyPoints(params: GraphicFiltersParams): Promise<Points> {
    return (
      await axiosApiInstance.post(`${BASE_URL}/calc_graph_phase`, params)
    ).data;
  },
});
