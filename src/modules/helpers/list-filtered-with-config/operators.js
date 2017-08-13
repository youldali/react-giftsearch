//@flow

import "babel-polyfill";

export
const inferior = (a: number | string, b: number | string): boolean => {
	return a < b;
};

export
const inferiorOrEqual = (a: number | string, b: number | string): boolean => {
	return a <= b;
};

export
const superior = (a: number | string, b: number | string): boolean => {
	return a > b;
};

export
const superiorOrEqual = (a: number | string, b: number | string): boolean => {
	return a >= b;
};

export
const equal = (a: mixed, b: mixed): boolean => {
	return a == b;
};

export
const equalStrict = (a: mixed, b: mixed): boolean => {
	return a === b;
};

export
const isIncluded = (a: mixed, b: mixed): boolean => {
	const typeOfb = Array.isArray(b) ? 'Array' : typeof b;

	switch(typeOfb){
		case 'Array':
			return b.includes(a);
		case 'string':
			return b.includes(a);
		default:
			return a == b; 
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

