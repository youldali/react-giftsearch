//@flow

import "babel-polyfill";

export
const inferior = (a: number, b: number): boolean => {

	return a < b;
};

export
const inferiorOrEqual = (a: number, b: number): boolean => {
	return a <= b;
};

export
const superior = (a: number, b: number): boolean => {
	return a > b;
};

export
const superiorOrEqual = (a: number, b: number): boolean => {
	return a >= b;
};

export
const equal = (a: number | string, b: number | string): boolean => {
	return a == b;
};

export
const equalStrict = (a: number | string, b: number | string): boolean => {
	return a === b;
};

export
const isIncluded = (a: number | string, b: Array<number | string>): boolean => {
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

