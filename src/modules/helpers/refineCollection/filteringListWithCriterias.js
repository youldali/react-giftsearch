//@flow

import "babel-polyfill";
import operators from './operators';
import { map, mapObjIndexed, compose, sort, concat } from 'ramda';

import type { FiltersCriteriasCollection, FiltersGroupsCollection, FilterCriteria } from 'modules/gift-search/config';
import type { FilterName, FilterValue, Filters } from 'modules/actions/types';

type FilterInfos = {|filterName: FilterName, filterGroup: string|};
type FilterFunction = (target: Object) => boolean;
type FiltersFunctionsCollection = [[FilterFunction]];
type FilterTuple = [FilterName, FilterFunction];
type FiltersFunctionsLookupMap = Map<FilterFunction, FilterInfos>;
type FiltersData = {
	filtersFunctionsCollection: FiltersFunctionsCollection, 
	filtersFunctionsLookupMap: FiltersFunctionsLookupMap
}

/**
 * evaluate a single criteria
 */
export
const evaluateSingleCriteria = (criteria: FilterCriteria, filterValueFallback: FilterValue, target: Object): boolean => {
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
const makeFilterFunction = (filterValueFallback: FilterValue, criterias: $ReadOnlyArray<FilterCriteria>): FilterFunction => {
	return function evaluateCriterias (target: Object): boolean {
		return (function evaluateNextCriteria (iterator: Iterator<FilterCriteria>): boolean {
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

// FiltersCriterias -> FilterValue, FilterName -> FilterFunction
const getFilterFunctionFromFilter = (filtersCriteriasCollection: FiltersCriteriasCollection) => 
(filterValue: FilterValue, filterName: FilterName): FilterFunction => (
	makeFilterFunction(filterValue, filtersCriteriasCollection[filterName])
);


//FilterGroupObject -> [FilterTuple] -> Map<FilterFunction, FilterInfo>
const getFiltersFunctionsLookupMap = (filtersGroupsCollection: FiltersGroupsCollection) => 
(filtersTuples: [FilterTuple]): FiltersFunctionsLookupMap => {
	const reducer = (lookupMap: FiltersFunctionsLookupMap, [filterName, filterFunction]) => {
		const filterGroup = filtersGroupsCollection[filterName];
		return lookupMap.set(filterFunction, {filterName, filterGroup});
	};

	return filtersTuples.reduce(reducer, new Map());
};


const createFilterFunctionCollectionStructure = () => {
	const filtersFunctionsBelongingToFilterGroup = {};
	const filtersFunctionsWithoutGroup = [];

	return {
		addFilterFunction(filterFunction: FilterFunction, filterGroup: string){
			return filterGroup ? 
				this.addFilterFunctionWithFilterGroup(filterFunction, filterGroup) : 
				this.addFilterFunctionWithoutFilterGroup(filterFunction);
		},

		addFilterFunctionWithoutFilterGroup(filterFunction: FilterFunction){
			filtersFunctionsWithoutGroup.push(filterFunction);
			return this;
		},

		addFilterFunctionWithFilterGroup(filterFunction: FilterFunction, filterGroup: string){
			const filterGroupFunctionCollection = filtersFunctionsBelongingToFilterGroup[filterGroup] || [];
			filterGroupFunctionCollection.push(filterFunction);
			filtersFunctionsBelongingToFilterGroup[filterGroup] = filterGroupFunctionCollection;
			return this;
		},

		getSortedFilterFunctionCollection(): FiltersFunctionsCollection{
			const sortByLength = (a, b) => {
				a.length - b.length;
			};
			 const sortedArray = sort(sortByLength)(Object.values(filtersFunctionsBelongingToFilterGroup));
			 return concat(filtersFunctionsWithoutGroup, sortedArray);
		}
	};
};

export 
const getFiltersFunctionsCollection = (filtersGroupsCollection: FiltersGroupsCollection) => 
(filtersTuples: [FilterTuple]): FiltersFunctionsCollection => {

	const reducer = (acc, [filterName, filterFunction]) => {
		const filterGroup = filtersGroupsCollection[filterName];
		return acc.addFilterFunction(filterFunction, filterGroup);
	};

	const filterFunctionCollectionStructure = filtersTuples.reduce(reducer, createFilterFunctionCollectionStructure());
	return filterFunctionCollectionStructure.getSortedFilterFunctionCollection();
};


export
const getFilteringData = (filtersCriteriasCollection: FiltersCriteriasCollection) =>
(filtersGroupsCollection: FiltersGroupsCollection) => 
(filters: Filters): FiltersData => {
	const mGetFilterFunctionFromFilter = map(getFilterFunctionFromFilter(filtersCriteriasCollection));
	const getFilterTuples = compose(Object.entries, mGetFilterFunctionFromFilter);

	const filterTuples = getFilterTuples(filters);
	const filtersFunctionsCollection = getFiltersFunctionsCollection(filtersGroupsCollection)(filterTuples);
	const filtersFunctionsLookupMap = getFiltersFunctionsLookupMap(filtersGroupsCollection)(filterTuples);

	return {
		filtersFunctionsCollection,
		filtersFunctionsLookupMap
	}
};

export default getFilteringData;
