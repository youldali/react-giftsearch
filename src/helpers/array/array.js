// @flow

export const
findHighestValueInObjects = (collection: Array<Object>, field: string): mixed => {
	return collection.reduce((accumulator: mixed, currentObject: Object): mixed => {
		if(accumulator > currentObject[field])
			return accumulator
		else
			return currentObject[field];
	}, collection[0][field]);
};