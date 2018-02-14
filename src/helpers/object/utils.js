// @flow

import { has } from 'ramda';
export const
deletePropertiesImmutable = (properties: Array<string>) => (target: Object): Object => {
	let resetedObject = {...target};
	for (const field of properties) {
		delete resetedObject[field];
	}
	return resetedObject;
};

//has at least 1 property
export const
hasOne = (properties: Array<string>) => (target: Object): boolean => (
	properties.reduce( (hasFound: boolean, nextPropertyToFind: string) => {
		return hasFound || has(nextPropertyToFind, target)
	}, false)
);