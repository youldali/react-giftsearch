// @flow
import type { GiftCollection } from 'modules/actions/types';
import fetch from 'isomorphic-fetch';

export default 
async (universe: string): Promise<GiftCollection> => {
	const fetchConfig = {
		method: 'GET'
	};	

	const response: Response = await fetch(url, fetchConfig);
	if(!response.ok) 
		return Promise.reject(`Status: ${response.status} - ${response.statusText}`);
	
	const jsonData = await response.json();
	return jsonData;
};

