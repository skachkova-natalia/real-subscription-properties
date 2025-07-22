import {createDomain} from 'effector';
import {propertyGraphicService} from '@services/propertyGraphicService';
import {GraphicParams, Point} from '@src/types/graphic';

export const graphicDomain = createDomain();

export const getPropertyPointsFx = graphicDomain.createEffect(propertyGraphicService.getPropertyPoints);

export const getPropertyPoints = graphicDomain.createEvent<GraphicParams>();

export const $points = graphicDomain.createStore<Point[]>([]);
