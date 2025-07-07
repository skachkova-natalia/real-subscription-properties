import {bindAllMethods} from '@utils/binder';
import {axiosApiInstance, BASE_URL} from '@core/api';
import {LatexUnitCode} from '@src/types/dictionary';

export const dictionaryService = bindAllMethods({
  async getLatexUnitsCode(): Promise<LatexUnitCode> {
    return (
      await axiosApiInstance.get(`${BASE_URL}/dictionary/get_unit_latex`)
    ).data;
  },
});
