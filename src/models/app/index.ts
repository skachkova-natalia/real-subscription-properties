import {createGate} from 'effector-react';
import {createDomain} from 'effector';

export const AppGate = createGate();

export const appDomain = createDomain();

export const changeAppLanguage = appDomain.createEvent();
