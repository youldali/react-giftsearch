// @flow
import type { GiftCollection } from 'modules/actions/types';
import localforage from 'localforage';
import { localforageConfig } from 'config';

localforage.config({
    name: localforageConfig.name || ''
});

export 
let storageSaveGifts = (universe: string, giftList: GiftCollection):Promise<GiftCollection>  => {
	return (
		localforage.setItem(universe, giftList)
			.catch((err) => {
			    console.log('Failed to save Gift List to storage', err);
					return Promise.reject(err);
			})
	);
};

export 
let storageGetGifts = (universe: string):Promise<GiftCollection>  => {
	return (
		localforage.getItem(universe)
			.then( (giftList) => {
			    if(giftList == null)
			    	return Promise.reject('universe not stored')
			    else
			    	return Promise.resolve(giftList);
			})
	);
};