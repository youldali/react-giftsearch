// @flow
import { curry } from 'ramda';


//string -> [object] -> any
const
_findHighestValueInObjects = (field: string, collection: Array<Object>): any => {
	return collection.reduce((accumulator: mixed, currentObject: Object): any => {
		if(accumulator > currentObject[field])
			return accumulator;
		else
			return currentObject[field];
	}, collection[0][field]);
};
export const findHighestValueInObjects = curry(_findHighestValueInObjects);


//number -> [a] -> [a] -> [a]
const
_findIntersectionOfSortedArrays = <T: Array<any>>(stopAt: number, a: T, b: T) => {
	const 
		length1 = a.length, 
		length2 = b.length,
		intersection = [];

	let 
		i = 0, 
		j = 0,
		numberOfMatch = 0;

	while(i < length1 && j < length2 && numberOfMatch < stopAt){
		let aI = a[i], bJ = b[j];
		if(aI > bJ)
			j++
		else if (aI < bJ)
			i++
		else{
			intersection.push(aI);
			i++;
			j++;
			numberOfMatch++;
		}
	}

	return intersection;
}

export const findIntersectionOfSortedArrays = curry(_findIntersectionOfSortedArrays);