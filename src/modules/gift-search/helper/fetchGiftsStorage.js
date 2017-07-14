// @flow

import localForage from 'localForage';
import { localForageConfig } from 'config';

localForage.config({
    name: localForageConfig.name || ''
});

export let storageSaveGifts = (universe: string, giftList: Array<Object>):Promise<?Array<Object>>  => {
	return localForage.setItem(universe, giftList)
					.catch((err) => {
					    console.log('Failed to save Gift List to storage', err);
							return Promise.reject(err);
					});
};

export let storageGetGifts = (universe: string):Promise<Array<Object>>  => {
	return localForage.getItem(universe)
						.then( (giftList) => {
						    if(giftList == null)
						    	return Promise.reject('universe not stored')
						    else
						    	return Promise.resolve(giftList);
						});
					
};