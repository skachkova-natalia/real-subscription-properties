import axios, {AxiosError, AxiosResponse, InternalAxiosRequestConfig} from 'axios';

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
export const REFRESH_ACCESS_TOKEN_ROUTE = `/login/refresh_tokens`;

const axiosApiInstance = axios.create({
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

axiosApiInstance.interceptors.request.use(onRequestInterceptor);
axiosApiInstance.interceptors.response.use((response) => response, onErrorInterceptor);

async function onRequestInterceptor(
  clientConfig: InternalAxiosRequestConfig,
): Promise<InternalAxiosRequestConfig> {
  const {url} = clientConfig;
  let accessToken = getTokens()?.accessToken;
  console.log(accessToken);

  if (url === REFRESH_ACCESS_TOKEN_ROUTE) {
    accessToken = getTokens()?.refreshToken;
  }

  if (accessToken && clientConfig.headers) {
    clientConfig.headers.Authorization = `Bearer ${accessToken}`;
  }

  return clientConfig;
}

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

export function getTokens() {
  try {
    const {access_token, refresh_token} = JSON.parse(
      localStorage.getItem('token') || '{}',
    );
    return {
      accessToken: access_token || '',
      refreshToken: refresh_token || '',
    };
  } catch (error) {
    window.location.href = '/';
    return {};
  }
}

export function logout() {
  localStorage.removeItem('token');
  window.location.href = '/';
}

export {axiosApiInstance};
