import {combine, createDomain} from 'effector';
import {authService} from '@services/authService';
import {ErrorDescription} from '@src/types/common';
import {ApiResponseError} from '@core/api';
import {createGate} from 'effector-react';

export const VerificationPageGate = createGate<string | null>();

export const verificationPageDomain = createDomain();

export const verifyFx = verificationPageDomain.createEffect<typeof authService.verify, ApiResponseError>(authService.verify);

export const $verificationError = verificationPageDomain.createStore<ErrorDescription | null>(null);
export const $verificationSuccess = verificationPageDomain.createStore<boolean>(false);

export const $verificationPage = combine({
  error: $verificationError,
  loading: verifyFx.pending,
  success: $verificationSuccess,
});
