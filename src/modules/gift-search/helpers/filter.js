//@flow
import type { FilterFunctionListMapped, FilterFunctionListByGroup, FilterFunction, FilterGroup, FilteredObjectStatus } from '../types';
import { curry } from 'ramda';

/**
 ** filters an object for a group filter with || operator
 */
const _filterObjectAgainstFilterGroup = 
(filterFunctionList: FilterFunction[], target: Object): boolean => 
(function evaluateNextFilterFunction(iterator: Iterator<FilterFunction>): boolean{
	//condition to get out of recursive call
	const currentIteratorState = iterator.next();
		if(currentIteratorState.done)
			return false;

	//eval the current criteria and ask for eval of the next one
	const filterFunction = currentIteratorState.value;
	return filterFunction(target) || evaluateNextFilterFunction(iterator);

	// $FlowFixMe
})(filterFunctionList[Symbol.iterator]());

export const filterObjectAgainstFilterGroup = curry(_filterObjectAgainstFilterGroup);

/**
 * Returns a filter function
 */

const _filterObjectAgainstFilterFunctionListByGroup = 
(filterFunctionListByGroup: FilterFunctionListByGroup, filterFunctionListMapped: FilterFunctionListMapped, target: Object) => 
(function* evaluateNextGroupOfFilterFunction(iterator: Iterator<FilterFunction[]>): Generator<FilteredObjectStatus, void, Iterator<FilterFunction[]>>{
	//condition to get out of recursive call
	const currentIteratorState = iterator.next();
	if(currentIteratorState.done){
		yield {pass: true};
		return;
	}

	//eval the current criteria and ask for eval of the next one
	const filterFunctionListForGroup = currentIteratorState.value;
	if(!filterObjectAgainstFilterGroup(filterFunctionListForGroup)(target))
		yield {pass: false, filterGroupRejected: filterFunctionListMapped.get(filterFunctionListForGroup)};
	
	yield* evaluateNextGroupOfFilterFunction(iterator);

	// $FlowFixMe
})(filterFunctionListByGroup[Symbol.iterator]());

export const filterObjectAgainstFilterFunctionListByGroup = curry(_filterObjectAgainstFilterFunctionListByGroup);


const _filter = 
(filterFunctionListByGroup: FilterFunctionListByGroup, filterFunctionListMapped: FilterFunctionListMapped, target: Object): FilteredObjectStatus =>
{
	const iteratorOnFilter = filterObjectAgainstFilterFunctionListByGroup(filterFunctionListByGroup, filterFunctionListMapped)(target);
	const filteringStatus = iteratorOnFilter.next().value || {pass: true};
	const filteringStatus2 = iteratorOnFilter.next().value;

	//case 1: the object pass => we return the 1st iteration {pass: true}
	//case 2: the object is rejected by 1 filter only: we return the first iteration {pass:false, filterGroupRejected: FilterGroup}
	//case 3: the object is rejected by 2 filters: we return {pass: false};
	return ( filteringStatus.pass || (filteringStatus2 && filteringStatus2.pass) 
			? filteringStatus
			: {pass: false} 
	);

};

export const filter = curry(_filter);

export default filter;