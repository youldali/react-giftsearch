// @flow
import type { GiftCollection } from 'modules/actions/types';
import { cloudSearchConfig } from 'modules/gift-search/config';
import fetch from 'isomorphic-fetch';
import { formatGiftCollection } from './giftFormatter';

export
const buildGiftUrl = 
(categories: Array<number>): string => {
	const universeParameter = categories.reduce(
		(acc, category) => `${acc}&category[]=${category}`,
		''
	);
	const url = cloudSearchConfig['baseUrl'] + universeParameter;
	return url;
}

export default 
(universe: string): Promise<GiftCollection> => {
	//builds URL
	const categories = cloudSearchConfig['universeToUrlMap'][universe];
	if(typeof categories === 'undefined'){
		return Promise.reject('Undefined Gift-List category');
	}

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
							return Promise.reject(`Status: ${response.status} - ${response.statusText}`);
					})
					.then((jsonData: Object) => {
						const giftCollection = formatGiftCollection(jsonData.items);
						return giftCollection;
					})
					.catch(error => {
						console.log('Error fetching Gift boxes', error);
						return Promise.reject(error);
					});
};

