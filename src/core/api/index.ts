import axios, {AxiosError, AxiosResponse} from 'axios';

export const BASE_URL = 'https://rsp-api.online';

export enum ApiResponseCode {
  SUCCESS = 0,
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface ApiResponse<T = any> {
  query_id: string;
  result: T;
  error?: string;
  detail: string;
}

export interface ApiResponseError extends Error {
  result?: {[key: string]: unknown};
  error: string;
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
  let detail: null | string = null;
  if (response) {
    detail = response.data.detail;
    if (response.data.result) {
      result = response.data.result;
    }
  }

  const error = new Error() as ApiResponseError;
  error.error = detail || '';
  if (result) {
    error.result = result;
  }
  throw error;
}

export {axiosApiInstance};
