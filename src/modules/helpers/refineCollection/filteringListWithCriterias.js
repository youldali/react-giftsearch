//@flow

import "babel-polyfill";
import operators from './operators';
import { map, mapObjIndexed, compose } from 'ramda';

type FilterName = string;
type FilterGroup = string;
type FilterValue = number | string | boolean;
type Filters = { +[string]: FilterValue};
type Criteria = {|field: string, operator: string, value?: FilterValue|};
type Criterias = $ReadOnlyArray<Criteria>;
type CriteriasCollection = {+[string]: {criterias: Criterias, +filterGroup?: string}};

type FilterFunction = (target: Object) => boolean;
type FilterCollection = Map<?string, Array<FilterFunction>>;
type FilterObject = {value: FilterValue, criterias: Criterias};

type FilterTuple = [FilterName, FilterFunction];
type GroupTuple = [FilterGroup, FilterFunction];

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

export
const getFiltersFunctionsCollection = (filters: Filters, criteriasCollection: CriteriasCollection): FilterCollection => {
	const filtersFunctionsCollection = new Map();


	//run through the filters
	for (const [filterName, filterValue] of Object.entries(filters)) {
	    const filterFunction = makeFilterFunction(filterValue, criteriasCollection[filterName].criterias);
	    const filterGroup = getFilterGroup(criteriasCollection, filterName);
	    addFilterFunctionToMap(filterGroup, filterFunction, filtersFunctionsCollection);
	}

	return filtersFunctionsCollection;
};
 */

// CriteriasCollection -> FilterValue, filterName -> FilterObject
const getFilterFunctionFromFilter = (criteriasCollection: CriteriasCollection) => (filterValue: FilterValue, filterName: string): FilterObject => (
	makeFilterFunction(filterValue, criteriasCollection[filterName].criterias)
);

// CriteriasCollection -> FilterTuple -> GroupTuple
const filterGroupAndFunction = (criteriasCollection: CriteriasCollection) => (filterTuple: FilterTuple): GroupTuple => (
	[getFilterGroup(criteriasCollection, filterTuple[0]), filterTuple[1]]
);


export 
const getFiltersFunctionsCollection = (filters: Filters, criteriasCollection: CriteriasCollection): FilterCollection => {
	const mAddCriteriaToFilterObject = mapObjIndexed(addCriteriaToFilterObject(criteriasCollection));
	const mGetFilterFunctionFromFilter = map(getFilterFunctionFromFilter);
	const mFilterTuple = Object.entries;
	const mFilterGroupAndFunction = map(filterGroupAndFunction(criteriasCollection));

	const getFilterFunctionCollection = compose(mFilterGroupAndFunction, mFilterTuple, mGetFilterFunctionFromFilter, mAddCriteriaToFilterObject);
	
	return new Map(getFilterFunctionCollection(filters));
};

export default getFiltersFunctionsCollection;
