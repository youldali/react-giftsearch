//@flow

import 'core-js/fn/object/entries';
import 'core-js/fn/object/values';
import operators from 'helpers/misc/operators';
import { compose, concat, curry, mapObjIndexed, sort } from 'ramda';

import type { FilterStructure, FilterStructureMap, FilterName, FilterOperand, FilterGroup, FilterFunction, FilterFunctionListByGroup, FilterTuple, FilterFunctionListMappedToFilterGroup, FiltersData, FiltersApplied } from '../types';

/**
 * evaluate a single criteria
 */

const _evaluateCriteria = 
(filterStructure: FilterStructure, filterOperand: FilterOperand, target: Object): boolean => {
	const {field, operator, operand} = filterStructure;
	return operators[operator](target[field], operand);
};
export const evaluateCriteria = curry(_evaluateCriteria);



//store filters functions according to group
//return a sorted filter function collection
export
const createFilterFunctionDataStructure = () => {
	const 
		filtersFunctionsMappedToFilterGroup: {[string]: FilterFunction[]} = {},
		noGroupFilterFunctionList: Array<FilterFunction[]> = [],
		filterFunctionListMappedToFilterGroup = new Map(),

		addFilterFunctionToNoGroupList = (filterFunction: FilterFunction) => noGroupFilterFunctionList.push([filterFunction]),

		addFilterFunctionToNewGroup = (filterFunction: FilterFunction, filterGroup: string) => {
			const filterGroupFunctionCollection = [filterFunction];
			filtersFunctionsMappedToFilterGroup[filterGroup] = filterGroupFunctionCollection;
			filterFunctionListMappedToFilterGroup.set(filterGroupFunctionCollection, filterGroup);
		},

		saveFilterFunctionIntoGroup = (filterFunction: FilterFunction, filterGroup: string) => filtersFunctionsMappedToFilterGroup[filterGroup].push(filterFunction);

	return {
		addFilterFunction(filterFunction: FilterFunction, filterGroup: ?string){
			!filterGroup 
				? addFilterFunctionToNoGroupList(filterFunction) :
			filtersFunctionsMappedToFilterGroup[filterGroup] 
				? saveFilterFunctionIntoGroup(filterFunction, filterGroup) : addFilterFunctionToNewGroup(filterFunction, filterGroup)
			
			return this;
		},

		getFilteringData(): FiltersData{
			const 
				sorterByLength = (a, b) => a.length - b.length,
				sortedFilterFunctionCollectionBelongingToGroup = compose(sort(sorterByLength), Object.values)(filtersFunctionsMappedToFilterGroup),
				filterFunctionListByGroup = concat(noGroupFilterFunctionList, sortedFilterFunctionCollectionBelongingToGroup);

			return {
				filterFunctionListByGroup,
				filterFunctionListMappedToFilterGroup
			}
		}
	};
};



const _getFilteringDataFromFilters = 
(filterStructureMap: FilterStructureMap, filtersApplied: FiltersApplied): FiltersData => {

	const 
		getFilteringDataFromFiltersTuples = (filtersTuples: [FilterTuple]): FiltersData => {

			const reducer = (filterFunctionDataStructure, [filterName, filterFunction]) => {
				const { filterGroup } = filterStructureMap[filterName];
				return filterFunctionDataStructure.addFilterFunction(filterFunction, filterGroup);
			};

			const filterFunctionCollectionStructure = filtersTuples.reduce(reducer, createFilterFunctionDataStructure());
			return filterFunctionCollectionStructure.getFilteringData();
		},

		getFilterFunctionFromAppliedFilter = (filterOperand: FilterOperand, filterName: FilterName): FilterFunction => evaluateCriteria(filterStructureMap[filterName], filterOperand);


	const 
		mGetFilterFunctionFromAppliedFilter = mapObjIndexed(getFilterFunctionFromAppliedFilter),
		filterData = compose(getFilteringDataFromFiltersTuples, Object.entries, mGetFilterFunctionFromAppliedFilter)(filtersApplied);

	return filterData;
};
export const getFilteringDataFromFilters = curry(_getFilteringDataFromFilters);

export default getFilteringDataFromFilters;