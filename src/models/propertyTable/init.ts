import {resetDomainStoresByEvents} from '@utils/effector';
import {tableDomain} from '@models/propertyTable/index';
import {AppGate} from '@models/app';

resetDomainStoresByEvents(tableDomain, AppGate.close);
