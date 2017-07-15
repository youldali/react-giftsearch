// @flow
import type { GiftList } from 'modules/actions/types';
import { cloudSearchConfig } from 'config';
import fetch from 'isomorphic-fetch';

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
(universe: string): Promise<GiftList> => {
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
						return jsonData.items;
					})
					.catch(error => {
						console.log('Error fetching Gift boxes', error);
						return Promise.reject(error);
					});
};

