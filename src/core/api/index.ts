import axios, {AxiosError, AxiosResponse} from 'axios';

export const BASE_URL = 'https://rsp-api.online/dev';

export enum ApiResponseCode {
  SUCCESS = 0,
}

interface ErrorDetail {
  code: number;
  type: string;
  error_info: string;
  msg_user_en: string;
  msg_user_ru: string;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface ApiResponse<T = any> {
  query_id: string;
  result: T;
  error?: string;
  detail: ErrorDetail;
}

export interface ApiResponseError extends Error {
  result?: {[key: string]: unknown};
  detail?: ErrorDetail;
}

const axiosApiInstance = axios.create({
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

axiosApiInstance.interceptors.response.use((response) => response, onErrorInterceptor);

async function onErrorInterceptor(e: AxiosError<ApiResponse>): Promise<AxiosResponse<ApiResponse>> {
  const {response} = e;
  let result: null | {[key: string]: unknown} = null;
  let detail: null | ErrorDetail = null;
  if (response) {
    detail = response.data.detail;
    if (response.data.result) {
      result = response.data.result;
    }
  }

  const error = new Error() as ApiResponseError;
  error.detail = detail || undefined;
  if (result) {
    error.result = result;
  }
  throw error;
}

export {axiosApiInstance};
