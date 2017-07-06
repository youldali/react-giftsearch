// @flow

import { cloudSearchConfig } from 'config';
import fetch from 'isomorphic-fetch';
import { storageGetGifts, storageSaveGifts } from './universeStorage';

export const buildGiftUrl = 
(categories: Array<number>): string => {
	const universeParameter = categories.reduce(
		(acc, category) => `${acc}&category[]=${category}`,
		''
	);
	const url = cloudSearchConfig['baseUrl'] + universeParameter;
	return url;
}

export const fetchGiftsRemotely  = 
(universe: string): Promise<Array<Object>> => {
	//builds URL
	const categories = cloudSearchConfig['universeToUrlMap'][universe];
	if(typeof categories === 'undefined')
		return new Promise((resolve, reject) => {
			console.log('Universe undefined');
		  resolve([]);
		});

	//fetches
	const fetchConfig = {
		method: 'GET'
	};	
	const url = buildGiftUrl(categories);
	return fetch(url, fetchConfig)
					.then(response => {
						if(response.ok) 
							return response.json();
						else
							throw (`Status: ${response.status} - ${response.statusText}`);
					})
					.then((jsonData: Object) => {
						const giftList = jsonData.items;
						storageSaveGifts(universe, giftList);
						return giftList;
					})
					.catch(error => {
						console.log('Error fetching Gift boxes', error);
						return [];
					});
};

export default 
(universe: string): Promise<Array<Object>> => {
	//fetch Gift List locally, if fails fetch remotely
		return storageGetGifts(universe)
						.catch(fetchGiftsRemotely);

};

