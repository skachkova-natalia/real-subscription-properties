import {bindAllMethods} from '@utils/binder';
import {axiosApiInstance} from '@core/api';
import {ModesResponse, SubstanceFiltersResponse, TableFilters} from '@src/types/filters';
import {TableResponse} from '@src/types/table';

export const propertyTableService = bindAllMethods({
  async getAvailableSubstance(): Promise<SubstanceFiltersResponse> {
    return (
      await axiosApiInstance.get(`/api/getAvailableSubstances`)
    ).data;
  },
  async getCalcModesInfo(id: string): Promise<ModesResponse> {
    return (
      await axiosApiInstance.get(`/api/getCalcModesInfo?id=${id}`)
    ).data;
  },
  async getTable({substanceId, modeId, params}: TableFilters): Promise<TableResponse> {
    return (
      await axiosApiInstance.post(`/api/getPropertiesTable?substanceId=${substanceId}&modeId=${modeId}`, params)
    ).data;
  },
});
