import {bindAllMethods} from '@utils/binder';
import {axiosApiInstance, BASE_URL} from '@core/api';
import {ModesResponse, PropertiesFilters, SubstanceFiltersResponse, TableFilters} from '@src/types/filters';
import {PropertiesListResponse, TableResponse} from '@src/types/table';

export const propertyTableService = bindAllMethods({
  async getAvailableSubstance(): Promise<SubstanceFiltersResponse> {
    return (
      await axiosApiInstance.get(`${BASE_URL}/getAvailableSubstances`)
    ).data;
  },
  async getCalcModesInfo(id: string): Promise<ModesResponse> {
    return (
      await axiosApiInstance.get(`${BASE_URL}/getCalcModesInfo?id=${id}`)
    ).data;
  },
  async getPropertiesList({substanceId, modeId}: PropertiesFilters): Promise<PropertiesListResponse> {
    return (
      await axiosApiInstance.get(`${BASE_URL}/getPropertiesLists?substanceId=${substanceId}&modeId=${modeId}`)
    ).data;
  },
  async getTable({substanceId, modeId, params}: TableFilters): Promise<TableResponse> {
    return (
      await axiosApiInstance.post(`${BASE_URL}/getPropertiesTable?substanceId=${substanceId}&modeId=${modeId}`, params)
    ).data;
  },
});
