//@flow

import "babel-polyfill";

export
const inferior = (a: any, b: any): boolean => {

	return a < b;
};

export
const inferiorOrEqual = (a: any, b: any): boolean => {
	return a <= b;
};

export
const superior = (a: any, b: any): boolean => {
	return a > b;
};

export
const superiorOrEqual = (a: any, b: any): boolean => {
	return a >= b;
};

export
const equal = (a: any, b: any): boolean => {
	return a == b;
};

export
const equalStrict = (a: any, b: any): boolean => {
	return a === b;
};

export
const isIncluded = (a: any, b: Array<number | string> | string): boolean => {
	const typeOfb = Array.isArray(b) ? 'Array' : typeof b;
	switch(typeOfb){
		case 'Array':
			return b.includes(a);
		case 'string':
			return b.includes(a);
		default:
			return false; 
	}
};

export default
{
	'<': inferior,
	'<=': inferiorOrEqual,
	'>': superior,
	'>=': superiorOrEqual,
	'==': equal,
	'===': equalStrict,
	isIncluded
};

