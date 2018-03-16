//@flow

import 'core-js/fn/array/includes.js';
import {findIntersectionOfSortedArrays} from 'helpers/array/utils';

export
const inferior = (a: any, b: any): boolean => a < b;

export
const inferiorOrEqual = (a: any, b: any): boolean => a <= b;

export
const superior = (a: any, b: any): boolean => a > b;

export
const superiorOrEqual = (a: any, b: any): boolean => a >= b;

export
const equal = (a: any, b: any): boolean => a == b;

export
const equalStrict = (a: any, b: any): boolean => a === b;

export
const inRangeClosed = (a: number, b: [number, number]): boolean => a >= b[0] && a <= b[1];

export
const inRangeOpen = (a: number, b: [number, number]): boolean => a > b[0] && a < b[1];

export
const inRangeOpenClosed = (a: number, b: [number, number]): boolean => a > b[0] && a <= b[1];

export
const inRangeClosedOpen = (a: number, b: [number, number]): boolean => a >= b[0] && a < b[1];

export
const isIncluded = <T: string | number>(a: T, b: Array<T>): boolean => b.includes(a);

export
const hasOneInCommon = <T: string[] | number[]>(a: T, b: T): boolean => !!findIntersectionOfSortedArrays(1, a, b).length;

export default
{
	'<': inferior,
	'<=': inferiorOrEqual,
	'>': superior,
	'>=': superiorOrEqual,
	'==': equal,
	'===': equalStrict,
	inRangeClosed,
	inRangeOpen,
	inRangeClosedOpen,
	inRangeOpenClosed,
	isIncluded,
	hasOneInCommon
};
