import {forwardPayload, resetDomainStoresByEvents} from '@utils/effector';
import {$latexUnitsCode, dictionaryDomain, getLatexUnitsCodeFx} from '@models/dictionary/index';
import {AppGate} from '@models/app';
import {sample} from 'effector';

resetDomainStoresByEvents(dictionaryDomain, AppGate.close);

$latexUnitsCode.on(getLatexUnitsCodeFx.doneData, forwardPayload());

sample({
  clock: AppGate.open,
  target: getLatexUnitsCodeFx,
});
