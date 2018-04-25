//@flow

import 'core-js/fn/object/entries';
import 'core-js/fn/object/values';
import operators from './operators';
import { mapObjIndexed, compose, sort, concat, curry } from 'ramda';

import type { FilterName, FilterOperand, Filters, FiltersCriteriasCollection, FiltersGroupsCollection, FilterCriteria, FilterGroup, FilterFunction, FilterFunctionListByGroup, FilterTuple, FilterFunctionListMappedToFilterGroup, FiltersData } from '../types';

/**
 * evaluate a single criteria
 */

const _evaluateCriteria = 
(criteria: FilterCriteria, filterOperandFallback: FilterOperand, target: Object): boolean => {
	const {field, operator, operand} = criteria;
	const filterOperand = operand || filterOperandFallback;
	return operators[operator](target[field], filterOperand);
};
export const evaluateCriteria = curry(_evaluateCriteria);

// FiltersCriterias -> FilterOperand, FilterName -> FilterFunction
const _getFilterFunctionFromFilter = 
(filtersCriteriasCollection: FiltersCriteriasCollection, filterOperand: FilterOperand, filterName: FilterName): FilterFunction => 
evaluateCriteria(filtersCriteriasCollection[filterName], filterOperand);

export const getFilterFunctionFromFilter = curry(_getFilterFunctionFromFilter);

//store filters functions according to group
//return a sorted filter function collection
export
const createFilterFunctionDataStructure = () => {
	const filtersFunctionsMappedToFilterGroup: {[string]: FilterFunction[]} = {};
	const noGroupFilterFunctionList: Array<FilterFunction[]> = [];
	const filterFunctionListMappedToFilterGroup = new Map();

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
			filterFunctionListMappedToFilterGroup.set(filterGroupFunctionCollection, filterGroup);
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
				filterFunctionListMappedToFilterGroup
			}
		}
	};
};

 
const _getFilteringDataFromFiltersTuples = 
(filtersGroupsCollection: FiltersGroupsCollection, filtersTuples: [FilterTuple]): FiltersData => {

	const reducer = (acc, [filterName, filterFunction]) => {
		const filterGroup = filtersGroupsCollection[filterName];
		return acc.addFilterFunction(filterFunction, filterGroup);
	};

	const filterFunctionCollectionStructure = filtersTuples.reduce(reducer, createFilterFunctionDataStructure());
	return filterFunctionCollectionStructure.getFilteringData();
};
export const getFilteringDataFromFiltersTuples = curry(_getFilteringDataFromFiltersTuples);


const _getFilteringDataFromFilters = 
(filtersCriteriasCollection: FiltersCriteriasCollection, filtersGroupsCollection: FiltersGroupsCollection, filters: Filters): FiltersData => {
	const mGetFilterFunctionFromFilter = mapObjIndexed(getFilterFunctionFromFilter(filtersCriteriasCollection));
	const mGetFilterData = compose(getFilteringDataFromFiltersTuples(filtersGroupsCollection), Object.entries, mGetFilterFunctionFromFilter);

	return mGetFilterData(filters);
};
export const getFilteringDataFromFilters = curry(_getFilteringDataFromFilters);

export default getFilteringDataFromFilters;