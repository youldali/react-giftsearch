//@flow

import "babel-polyfill";
import operators from './operators'

type FilterValue = number | string | boolean;
type Filters = { +[string]: FilterValue};
type Criteria = {|field: string, operator: string, value?: FilterValue|};
type Criterias = $ReadOnlyArray<Criteria>;
type CriteriasCollection = {+[string]: {criterias: Criterias, +filterGroup?: string}};

type FilterFunction = (target: Object) => boolean;
type FilterCollection = Map<?string, Array<FilterFunction>>;

/**
 * Return the filter Group label of a particular filter name for a criteriasCollection
 */
export
const getFilterGroup = (criteriasCollection: CriteriasCollection, filterName: string): ?string => {
	return criteriasCollection[filterName]['filterGroup'];
};


/**
 * Add a filter function to the correct filter group array in the Map
 */
export
const addFilterFunctionToMap = (filterGroup: ?string, filterFunction: Function, filterCollection: FilterCollection): void => {
	let subFilterCollection;
	if(filterCollection.has(filterGroup)){
		subFilterCollection = filterCollection.get(filterGroup);
		subFilterCollection.push(filterFunction);
	}
	else{
		subFilterCollection = [filterFunction];
	}

	filterCollection.set(filterGroup, subFilterCollection);
};

/**
 * evaluate a single criteria
 */
export
const evaluateSingleCriteria = (criteria: Criteria, filterValueFallback: FilterValue, target: Object): boolean => {
	const {field, operator, value} = criteria;
	if(!target.hasOwnProperty(field))
	   return false;

	const filterValue = value === undefined ? filterValueFallback : value;
	return operators[operator](target[field], filterValue);
};

/**
 * Returns a filter function that evaluates a filter name associated with a list of criterias
 */
export
const makeFilterFunction = (filterValueFallback: FilterValue, criterias: Criterias): FilterFunction => {
	return function evaluateCriterias (target: Object): boolean {
		return (function evaluateNextCriteria (iterator: Iterator<Criteria>): boolean {
			//condition to get out of recursive call
			const currentIteratorState = iterator.next();
			if(currentIteratorState.done)
				return true;

			//eval the current criteria and ask for eval of the next one
			const criteria = currentIteratorState.value;
			return evaluateSingleCriteria(criteria, filterValueFallback, target) && evaluateNextCriteria(iterator);
		})(criterias[Symbol.iterator]());
	}
};

/**
 * Returns a collection of filter function grouped by 'filterGroup'
 */
export
const getFiltersFunctionsCollection = (filters: Filters, criteriasCollection: CriteriasCollection): FilterCollection => {
	const filtersFunctionsCollection = new Map();

	//run through the filters
	for (const [filterName, filterValue] of Object.entries(filters)) {
	    if(!criteriasCollection.hasOwnProperty(filterName)
	    	 || (typeof filterValue !== 'number' && typeof filterValue !== 'string' && typeof filterValue !== 'boolean')
	    	 )
	    	continue;

	    const filterFunction = makeFilterFunction(filterValue, criteriasCollection[filterName].criterias);
	    const filterGroup = getFilterGroup(criteriasCollection, filterName);
	    addFilterFunctionToMap(filterGroup, filterFunction, filtersFunctionsCollection);
	}

	return filtersFunctionsCollection;
};


/**
 ** filters an object for a group filter with || operator
 */
export
const filterObjectWithFilterGroup = (filterGroupCollection: Array<Function>, target: Object): boolean => {
	return (function evaluateNextFilterFunction(iterator: Iterator<FilterFunction>): boolean{
		//condition to get out of recursive call
		const currentIteratorState = iterator.next();
			if(currentIteratorState.done)
				return false;

		//eval the current criteria and ask for eval of the next one
		const filterFunction = currentIteratorState.value;
		return filterFunction(target) || evaluateNextFilterFunction(iterator);
	})(filterGroupCollection[Symbol.iterator]());
};


/**
 ** filters an object for a group filter with && operator
 */
export
const filterObjectWithIndependentFilters = (filterGroupCollection: Array<Function>, target: Object): boolean => {
	return (function evaluateNextFunction(iterator: Iterator<FilterFunction>): boolean{
		//condition to get out of recursive call
		const currentIteratorState = iterator.next();
			if(currentIteratorState.done)
				return true;

		//eval the current criteria and ask for eval of the next one
		const filterFunction = currentIteratorState.value;
		return filterFunction(target) && evaluateNextFunction(iterator);
	})(filterGroupCollection[Symbol.iterator]());
};

/**
 * Returns a filter function
 */
export
const filterObjectWithFilterCollection = (filterCollection: FilterCollection): FilterFunction => {
	return (target: Object): boolean => {

		const filterCollectionIterator = filterCollection.entries();
		return (function evaluateNextFilterGroupCollection(iterator: Iterator<[?string, Array<FilterFunction>]>): boolean{
			//condition to get out of recursive call
			const currentIteratorState = iterator.next();
			if(currentIteratorState.done)
				return true;

			//eval the current criteria and ask for eval of the next one
			const [filterGroupName, filterGroupCollection] = currentIteratorState.value;
			if(filterGroupName === undefined)
				return filterObjectWithIndependentFilters(filterGroupCollection, target) && evaluateNextFilterGroupCollection(iterator);
			else
				return filterObjectWithFilterGroup(filterGroupCollection, target) && evaluateNextFilterGroupCollection(iterator);
			
		})(filterCollectionIterator);

	}
};


/**
 * filters an array of object and returns a new array
 */
export default
(target: Array<Object>, filters: Filters, criteriasCollection: CriteriasCollection): Array<Object> => {
	const filterCollection = getFiltersFunctionsCollection(filters, criteriasCollection);
	return target.filter(filterObjectWithFilterCollection(filterCollection));
};
