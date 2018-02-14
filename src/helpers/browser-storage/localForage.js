// @flow
import localforage from 'localforage';

localforage.config({
    name: 'Gift-Search'
});

export 
let saveToStorage = (key: string, itemToStore: any):Promise<any> => {
	return (
		localforage.setItem(key, itemToStore)
			.catch((err) => {
			    console.log(`Failed to save ${key} to storage`, err);
					return Promise.reject(err);
			})
	);
};

export 
let getFromStorage = (key: string):Promise<any> => {
	return (
		localforage.getItem(key)
			.then( (storedItem) => {
			    if(storedItem == null)
			    	return Promise.reject(`${key} not stored`);
			    else
			    	return Promise.resolve(storedItem);
			})
	);
};