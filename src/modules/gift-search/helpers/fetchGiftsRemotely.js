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
async (universe: string): Promise<GiftCollection> => {
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

	const response: Response = await fetch(url, fetchConfig);
	if(!response.ok) 
		return Promise.reject(`Status: ${response.status} - ${response.statusText}`);
	
	const jsonData = await response.json();
	return formatGiftCollection(jsonData.items);
};

