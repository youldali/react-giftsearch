//@flow
import type { FilteredObjectIdsMappedByGroup, FilterGroup, FilterOperandStatistic } from '../types';
import { findIntersectionOfSortedArrays } from 'helpers/array/utils.js'
import { curry } from 'ramda';

const _getFilterOperandStatistic = 
(   filteredObjectIdsMappedByGroup: FilteredObjectIdsMappedByGroup, 
    itemIdListMatchingOperandOnly: number[], 
    isOperandSelected: boolean, 
    filterGroup: FilterGroup
): FilterOperandStatistic => {

    const findIntersectionOfSortedArraysWithOperandIdList = findIntersectionOfSortedArrays(itemIdListMatchingOperandOnly);

    //useful for filter belonging to a filter group, exp: +3
    const getItemIdListAddedByOperand = () => (
        {
            type: 'relative',
            idList: findIntersectionOfSortedArraysWithOperandIdList(filteredObjectIdsMappedByGroup.get(filterGroup))
        }
    );

    //for independant filter
    const getItemIdLimitedByOperand= () => (
        {
            type: 'absolute',
            idList: findIntersectionOfSortedArraysWithOperandIdList(filteredObjectIdsMappedByGroup.get(true))
        }
    );

    return (
        isOperandSelected || filteredObjectIdsMappedByGroup.get(filterGroup) === undefined
        ? getItemIdLimitedByOperand()
        : getItemIdListAddedByOperand()
    );
};

const getFilterOperandStatistic = curry(_getFilterOperandStatistic);

export default getFilterOperandStatistic;