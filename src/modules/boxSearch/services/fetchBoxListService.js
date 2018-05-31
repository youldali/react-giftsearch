// @flow
import type { BoxCollection } from '../types';
import fetch from 'isomorphic-fetch';
import { boxesEndpointURL } from '../config/api.config'

type APIResponse = {
	data: BoxCollection
};

export default 
async (universe: string): Promise<APIResponse> => {
	const 
		fetchConfig = {
			method: 'GET',
		},
		url = boxesEndpointURL + '?' + universe;

	const response: Response = await fetch(url, fetchConfig);
	if(!response.ok) 
		return Promise.reject(`Status: ${response.status} - ${response.statusText}`);
	
	const jsonData = await response.json();
	return jsonData;
};

