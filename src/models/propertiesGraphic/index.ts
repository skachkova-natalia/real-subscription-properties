import {combine, createDomain} from 'effector';
import {propertyGraphicService} from '@services/propertyGraphicService';
import {GraphicParams, Point} from '@src/types/graphic';
import {ApiResponseError} from '@core/api';
import {ErrorDescription} from '@src/types/common';

export const graphicDomain = createDomain();

export const getPropertyPointsFx = graphicDomain.createEffect<typeof propertyGraphicService.getPropertyPoints, ApiResponseError>(propertyGraphicService.getPropertyPoints);

export const getPropertyPoints = graphicDomain.createEvent<GraphicParams>();

export const $points = graphicDomain.createStore<Point[]>([]);
export const $error = graphicDomain.createStore<ErrorDescription | null>(null);

export const $graphic = combine({
  points: $points,
  error: $error,
  loading: getPropertyPointsFx.pending,
});
