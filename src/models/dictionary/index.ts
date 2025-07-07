import {createDomain} from 'effector';
import {dictionaryService} from '@services/dictionaryService';

export const dictionaryDomain = createDomain();

export const $latexUnitsCode = dictionaryDomain.createStore({});

export const getLatexUnitsCodeFx = dictionaryDomain.createEffect(dictionaryService.getLatexUnitsCode);
