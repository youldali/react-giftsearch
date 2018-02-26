
import type { FiltersFunctionsLookupMap, FiltersFunctionsCollection } from './filterFunctionBuilder';


/**
 ** filters an object for a group filter with || operator
 */
export
const filterObjectAgainstFilterGroup = (filterGroupCollection: FilterFunction[], target: Object): boolean => {
	return
	(function evaluateNextFilterFunction(iterator: Iterator<FilterFunction>): boolean{
		//condition to get out of recursive call
		const currentIteratorState = iterator.next();
			if(currentIteratorState.done)
				return false;

		//eval the current criteria and ask for eval of the next one
		const filterFunction = currentIteratorState.value;
		return filterFunction(target) || evaluateNextFilterFunction(iterator);
	})(filterGroupCollection[Symbol.iterator]());
};


export 
function* evaluateNextGroupOfFilterFunction(iterator: Iterator<FilterFunction[]>): boolean{
	//condition to get out of recursive call
	const currentIteratorState = iterator.next();
	if(currentIteratorState.done)
		return {pass: true};

	//eval the current criteria and ask for eval of the next one
	const groupOfFilterFunction = currentIteratorState.value;

	return filterObjectAgainstFilterGroup(groupOfFilterFunction, target) 
			? evaluateNextGroupOfFilterFunction(iterator)
			: {pass: false, group: groupOfFilterFunction};

};

/**
 * Returns a filter function
 */
export
const filterObjectWithFilterFunctionCollection = 
(filtersFunctionsCollection: FiltersFunctionsCollection) => 
(target: Object) => 
(function* evaluateNextGroupOfFilterFunction(iterator: Iterator<FilterFunction[]>): boolean{
	//condition to get out of recursive call
	const currentIteratorState = iterator.next();
	if(currentIteratorState.done){
		yield {pass: true};
		return;
	}
	
	//eval the current criteria and ask for eval of the next one
	const groupOfFilterFunction = currentIteratorState.value;
	if(!filterObjectAgainstFilterGroup(groupOfFilterFunction, target) )
		yield {pass: false, group: groupOfFilterFunction};
	
	yield* evaluateNextGroupOfFilterFunction(iterator);

})(filtersFunctionsCollection[Symbol.iterator]());




export
const filter = 
(filtersFunctionsCollection: FiltersFunctionsCollection, filtersFunctionsLookupMap: FiltersFunctionsLookupMap) =>
(target: Object) =>
{
	return filterObjectWithFilterFunctionCollection(filtersFunctionsCollection)(target);
};

export default filter;