import {bindAllMethods} from '@utils/binder';
import {axiosApiInstance, BASE_URL} from '@core/api';
import {
  ModesResponse,
  PropertiesFilters,
  PropertiesListResponse,
  SubstanceFiltersResponse,
  TableFilters, TableRowFilters,
} from '@src/types/filters';
import {TableResponse, TableRowResponse} from '@src/types/table';

export const propertyTableService = bindAllMethods({
  async getAvailableSubstance(): Promise<SubstanceFiltersResponse> {
    return (
      await axiosApiInstance.get(`${BASE_URL}/get_available_substances`)
    ).data;
  },
  async getCalcModesInfo(substance_name: string): Promise<ModesResponse> {
    return (
      await axiosApiInstance.get(`${BASE_URL}/get_calc_modes_info?substance_name=${substance_name}`)
    ).data;
  },
  async getPropertiesList({substance_name, mode_name}: PropertiesFilters): Promise<PropertiesListResponse> {
    return (
      await axiosApiInstance.get(`${BASE_URL}/get_properties_lists?substance_name=${substance_name}&mode_name=${mode_name}`)
    ).data;
  },
  async getTable(params: TableFilters): Promise<TableResponse> {
    return (
      await axiosApiInstance.post(`${BASE_URL}/get_properties_table`, params)
    ).data;
  },
  async getTableRow(params: TableRowFilters): Promise<TableRowResponse> {
    return (
      await axiosApiInstance.post(`${BASE_URL}/get_properties_table_row`, params)
    ).data;
  },
});
