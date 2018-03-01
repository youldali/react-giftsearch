//@flow

import 'core-js/fn/object/entries';
import 'core-js/fn/object/values';
import operators from './operators';
import { mapObjIndexed, compose, sort, concat } from 'ramda';

import type { FiltersCriteriasCollection, FiltersGroupsCollection, FilterCriteria, FilterGroup } from 'modules/gift-search/config';
import type { FilterName, FilterValue, Filters } from 'modules/actions/types';

export type FilterFunction = (target: Object) => boolean;
export type FilterFunctionListByGroup = Array<FilterFunction[]>;
export type FilterTuple = [FilterName, FilterFunction];
export type FilterFunctionListMapped = Map<FilterFunction[], FilterGroup>;
export type FiltersData = {
	filterFunctionListByGroup: FilterFunctionListByGroup, 
	filterFunctionListMapped: FilterFunctionListMapped
}

/**
 * evaluate a single criteria
 */
export
const evaluateSingleCriteria = 
(criteria: FilterCriteria, filterValueFallback: FilterValue) =>
(target: Object): boolean => {
	const {field, operator, value} = criteria;
	const filterValue = value === undefined ? filterValueFallback : value;
	return operators[operator](target[field], filterValue);
};

/**
 * Returns a filter function that evaluates a filter name associated with a list of criterias
 */
export
const evaluateCriteriaList = 
(filterValueFallback: FilterValue, criterias: $ReadOnlyArray<FilterCriteria>): FilterFunction => 
(target: Object): boolean =>
(function evaluateNextCriteria (iterator: Iterator<FilterCriteria>): boolean {
	//condition to get out of recursive call
	const currentIteratorState = iterator.next();
	if(currentIteratorState.done)
		return true;

	//eval the current criteria and ask for eval of the next one
	const criteria = currentIteratorState.value;
	return evaluateSingleCriteria(criteria, filterValueFallback)(target) && evaluateNextCriteria(iterator);

	// $FlowFixMe
})(criterias[Symbol.iterator]());

// FiltersCriterias -> FilterValue, FilterName -> FilterFunction
export
const getFilterFunctionFromFilter = 
(filtersCriteriasCollection: FiltersCriteriasCollection) => 
(filterValue: FilterValue, filterName: FilterName): FilterFunction => 
evaluateCriteriaList(filterValue, filtersCriteriasCollection[filterName]);


//store filters functions according to group
//return a sorted filter function collection
export
const createFilterFunctionDataStructure = () => {
	const filtersFunctionsMappedToFilterGroup: {[string]: FilterFunction[]} = {};
	const noGroupFilterFunctionList: Array<FilterFunction[]> = [];
	const filterFunctionListMapped = new Map();

	return {
		addFilterFunction(filterFunction: FilterFunction, filterGroup: ?string){
			return (
				!filterGroup 
					? this.addFilterFunctionToNoGroupList(filterFunction) :
				filtersFunctionsMappedToFilterGroup[filterGroup] 
					? this.saveFilterFunctionIntoGroup(filterFunction, filterGroup) : this.addFilterFunctionToNewGroup(filterFunction, filterGroup)
			);
		},

		addFilterFunctionToNoGroupList(filterFunction: FilterFunction){
			noGroupFilterFunctionList.push([filterFunction]);
			return this;
		},

		addFilterFunctionToNewGroup(filterFunction: FilterFunction, filterGroup: string){
			const filterGroupFunctionCollection = [filterFunction];
			filtersFunctionsMappedToFilterGroup[filterGroup] = filterGroupFunctionCollection;
			filterFunctionListMapped.set(filterGroupFunctionCollection, filterGroup);
			return this;
		},

		saveFilterFunctionIntoGroup(filterFunction: FilterFunction, filterGroup: string){
			const filterGroupFunctionCollection = filtersFunctionsMappedToFilterGroup[filterGroup]
			filterGroupFunctionCollection.push(filterFunction);
			return this;
		},

		getFilteringData(): FiltersData{
			const sortByLength = (a, b) => a.length - b.length;
			const sortedFilterFunctionCollectionBelongingToGroup= sort(sortByLength)(Object.values(filtersFunctionsMappedToFilterGroup));
			const filterFunctionListByGroup = concat(noGroupFilterFunctionList, sortedFilterFunctionCollectionBelongingToGroup);
			return {
				filterFunctionListByGroup,
				filterFunctionListMapped
			}
		}
	};
};

export 
const getFilteringDataFromFiltersTuples = 
(filtersGroupsCollection: FiltersGroupsCollection) => 
(filtersTuples: [FilterTuple]): FiltersData => {

	const reducer = (acc, [filterName, filterFunction]) => {
		const filterGroup = filtersGroupsCollection[filterName];
		return acc.addFilterFunction(filterFunction, filterGroup);
	};

	const filterFunctionCollectionStructure = filtersTuples.reduce(reducer, createFilterFunctionDataStructure());
	return filterFunctionCollectionStructure.getFilteringData();
};


export
const getFilteringDataFromFilters = 
(filtersCriteriasCollection: FiltersCriteriasCollection, filtersGroupsCollection: FiltersGroupsCollection) => 
(filters: Filters): FiltersData => {
	const mGetFilterFunctionFromFilter = mapObjIndexed(getFilterFunctionFromFilter(filtersCriteriasCollection));
	const mGetFilterData = compose(getFilteringDataFromFiltersTuples(filtersGroupsCollection), Object.entries, mGetFilterFunctionFromFilter);

	return mGetFilterData(filters);
};

export default getFilteringDataFromFilters;