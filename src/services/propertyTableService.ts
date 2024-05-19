import {bindAllMethods} from '@utils/binder';
import {axiosApiInstance} from '@core/api';
import {ModesResponse, SubstanceFiltersResponse} from '@src/types/filters';

export const propertyTableService = bindAllMethods({
  async getAvailableSubstance(): Promise<SubstanceFiltersResponse> {
    return (
      await axiosApiInstance.get(`http://rsp-api.online/getAvailableSubstances`)
    ).data;
  },
  async getCalcModesInfo(id: string): Promise<ModesResponse> {
    return (
      await axiosApiInstance.get(`http://rsp-api.online/getCalcModesInfo?id=${id}`)
    ).data;
  },
  async getTable(substanceId: string, modeId: string): Promise<void> {
    return (
      await axiosApiInstance.get(`http://rsp-api.online/getPropertiesTable?substanceId=${substanceId}&modeId=${modeId}`)
    ).data;
  },
});
