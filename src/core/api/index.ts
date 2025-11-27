import axios, {AxiosError, AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig} from 'axios';
import {LocaleTranslation} from '@src/types/common';

export const BASE_URL = 'https://rsp-api.online/dev';

export enum ApiResponseCode {
  SUCCESS = 0,
}

interface ErrorDetail {
  code: number;
  type: string;
  error_info: string;
  msg: LocaleTranslation;
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
let refreshTokenPromise: null | Promise<void> = null;

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

  if (url === REFRESH_ACCESS_TOKEN_ROUTE) {
    accessToken = getTokens()?.refresh_token;
  }

  if (accessToken && clientConfig.headers) {
    clientConfig.headers.Authorization = `Bearer ${accessToken}`;
  }

  return clientConfig;
}

async function onErrorInterceptor(e: AxiosError<ApiResponse>): Promise<AxiosResponse<ApiResponse>> {
  const {response, config} = e;
  let httpCode: null | number = null;
  let result: null | {[key: string]: unknown} = null;
  let detail: null | ErrorDetail = null;
  if (response) {
    httpCode = response.status;
    detail = response.data.detail;
    if (response.data.result) {
      result = response.data.result;
    }
  }

  if (httpCode === 401) {
    try {
      if (!refreshTokenPromise) {
        refreshTokenPromise = refreshAccessToken();
      }

      await refreshTokenPromise;
      refreshTokenPromise = null;

      if (config) {
        config.headers.Authorization = `Bearer ${getTokens()?.accessToken}`;
      }

      return await axiosApiInstance.request(config as AxiosRequestConfig);
    } catch (refreshTokenError) {
      refreshTokenPromise = null;
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
      refresh_token: refresh_token || '',
    };
  } catch (error) {
    window.location.href = '/';
    return {};
  }
}

async function refreshAccessToken(): Promise<void> {
  const req = {refresh_token: getTokens().refresh_token || ''};
  await axiosApiInstance.post(REFRESH_ACCESS_TOKEN_ROUTE, req);
}

export function logout() {
  localStorage.removeItem('token');
  window.location.href = '/';
}

export {axiosApiInstance};
