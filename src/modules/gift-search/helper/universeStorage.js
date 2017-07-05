// @flow

import localForage from 'localForage';
import { localForageConfig } from 'config';

localforage.config({
    name: localForageConfig.name || ''
});

export let saveGiftList = (universe: string, giftList: Array<Object>):Promise<Array<Object>>  => {
	return localforage.setItem('universe', giftList);
}