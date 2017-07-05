// @flow

import { cloudSearchConfig } from 'config';
import fetch from 'isomorphic-fetch';

export 
const buildGiftUrl = (categories: Array<number>): string => {
	const universeParameter = categories.reduce(
		(acc, category) => `${acc}&category[]=${category}`,
		''
	);
	const url = cloudSearchConfig['baseUrl'] + universeParameter;
	return url;
}

export default 
(universe: string): Promise<?string> => {
	const categories = cloudSearchConfig['universeToUrlMap'][universe];
	if(typeof categories === 'undefined')
		return new Promise((resolve, reject) => {
			console.log('Universe undefined');
		  resolve(undefined);
		});

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
					.then((jsonData: Object) => jsonData.items)
					.catch(error => {
						console.log('Error fetching Gift boxes', error);
						return undefined;
					});
}

