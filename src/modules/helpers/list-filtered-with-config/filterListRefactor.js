//@flow

import "babel-polyfill";

type FilterValue = number | string | boolean;
type Filters = { +[string]: FilterValue};
type Criteria = {|field: string, operator: string, value?: FilterValue|};
type Criterias = $ReadOnlyArray<Criteria>;
type CriteriasCollection = {+[string]: {criterias: Criterias, +filterGroup?: string}};
type FilterFunction = (target: Object) => boolean;

export
const getFilterGroup = (criteriasCollection: CriteriasCollection, filterName: string){
	return criteriasCollection[filterName]['filterGroup'];
}

export
const addFilterFunctionToMap(key: mixed, filterFunction: Function, filterCollection: Map){
	if(filterCollection.has(key)){
		let subFilterCollection = filterCollection.get(key);
		subFilterCollection.push(filterFunction);
	}
	else{
		let subFilterCollection = [filterFunction];
	}

	filterCollection.set(key, subFilterCollection);
}

/**
 * evaluate a single criteria
 */
export
const evaluateSingleCriteria = (criteria: Criteria, filterValueFallback: FilterValue, target: Object): boolean => {
	const {field, operatorSymbol, value} = criteria;
	if(!target.hasOwnProperty(field))
	   return false;

	const filterValue = value === undefined ? filterValueFallback : value;
	return operator[operatorSymbol](target[field], filterValue);
}

/**
 * Returns a filter function that evaluates a filter name associated with a list of criterias
 */
export
const makeFilterFunction = (filterValueFallback: FilterValue, criterias: Criterias): Function => {
	return function(target: Object): boolean{
		return (function evaluateNextCriteria(i: number): boolean{
			//condition to get out of recursive call
			if(i < 0)
				return true;

			//eval the current criteria and ask for eval of the next one
			const criteria = criterias[i];
			return evaluateSingleCriteria(criteria) && evaluateNextCriteria(i-1);
		})(criterias.length);
	}
}

/**
 * Returns a collection of filter function grouped by 'filterGroup'
 */
export
const getFiltersFunctionsCollection = (filters: Filters, criteriasCollection: CriteriasCollection): Map<mixed: [Function]> => {
	var filtersFunctionsCollection = new Map();

	//run through the filters
	for (const [filterName, filterValue] of Object.entries(filters)) {
	    if(!criteriasCollection.hasOwnProperty(filterName))
	    	continue;

	    filterFunction = makeFilterFunction(filterValue, criteriasCollection[filterName].criterias);
	    filterGroup = getFilterGroup(criteriasCollection, filterName);
	    addFilterFunctionToMap(filterGroup, filterFunction, filtersFunctionsCollection);
	}

	return filtersFunctionsCollection;
};


/**
 ** filters an object for a group filter with || operator
 */
export
const filterObjectWithFilterGroup = (filterGroupCollection: Array<Function>, target){
	return (function evaluateNextFunction(i: number): boolean{
			//condition to get out of recursive call
			if(i < 0)
				return false;

			//eval the current criteria and ask for eval of the next one
			const filterFunction = filterGroupCollection[i];
			return filterFunction(target) || evaluateNextFunction(i-1);
		})(filterGroupCollection.length);
	}
}

/**
 ** filters an object for a group filter with && operator
 */
export
const filterObjectWithIndependentFilters = (filterGroupCollection: Array<Function>, target){
	return (function evaluateNextFunction(i: number): boolean{
			//condition to get out of recursive call
			if(i < 0)
				return false;

			//eval the current criteria and ask for eval of the next one
			const filterFunction = filterGroupCollection[i];
			return filterFunction(target) && evaluateNextFunction(i-1);
		})(filterGroupCollection.length);
	}
}

/**
 * Returns a filter function
 */
export
const filterObjectWithFilterCollection = (filterCollection: Map): FilterFunction => {
	return (target: Object): boolean => {

		const filterCollectionIterator = filterCollection.entries();
		return (function evaluateNextFilterGroupCollection(iterator: Iterator): boolean{
			//condition to get out of recursive call
			if(iterator.next().done)
				return true;

			//eval the current criteria and ask for eval of the next one
			const {filterGroupName, filterGroupCollection} = iterator.next();
			filterGroupName === undefined 
				? return filterObjectWithIndependentFilters(filterGroupCollection, target) && evaluateNextFilterGroupCollection(iterator)
				: return filterObjectWithFilterGroup(filterGroupCollection, target) && evaluateNextFilterGroupCollection(iterator);
			
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
