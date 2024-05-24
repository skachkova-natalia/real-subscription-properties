import axios, {AxiosError, AxiosResponse} from 'axios';

export const BASE_URL = 'https://rsp-api.online';

export enum ApiResponseCode {
  SUCCESS = 0,
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface ApiResponse<T = any> {
  query_id: string;
  code: ApiResponseCode;
  result: T;
  error?: string;
}

export interface ApiResponseError extends Error {
  errorCode: ApiResponseCode | null;
  httpCode: number | null;
  result?: {[key: string]: unknown};
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
  let httpCode: null | number = null;
  let errorCode: null | ApiResponseCode = null;
  let result: null | {[key: string]: unknown} = null;
  if (response) {
    httpCode = response.status;
    errorCode = response.data.code;
    if (response.data.result) {
      result = response.data.result;
    }
  }

  const error = new Error() as ApiResponseError;
  error.errorCode = errorCode;
  error.httpCode = httpCode;
  if (result) {
    error.result = result;
  }
  throw error;
}

export {axiosApiInstance};
