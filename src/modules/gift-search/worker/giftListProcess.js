//@flow
import type { FilteredObjectIdsMappedByGroup } from '../types';

import getFilteringDataFromFilters from '../helpers/filterFunctionBuilder';
import filter from '../helpers/filter';
import { createOrOpenDatabase, iterateOverBoxesInUniverse, getAllUniqueKeysForIndex } from '../helpers/storage';
import { createFilterStatisticStructure } from '../helpers/filterStatistic';
import { curry, compose } from 'ramda';
import { transformIntoObject } from 'helpers/array/utils';


const _getFilterItemsStatisticMap = async (db, requestData, filtersCriterias, filtersGroups) => {
    const {universe, filters} = requestData;
    
    //filter function builder
    const {filterFunctionListByGroup, filterFunctionListMappedToFilterGroup} = getFilteringDataFromFilters(filtersCriterias, filtersGroups, filters);

    //filter
    const 
        appliedGetFilterStatusForItem = filter(filterFunctionListByGroup, filterFunctionListMappedToFilterGroup),
        filterStatisticStructure = createFilterStatisticStructure(),
        appliedIterateOnItemCallback = iterateOnItemCallback(filterStatisticStructure, appliedGetFilterStatusForItem);

    await iterateOverBoxesInUniverse (db, universe, appliedIterateOnItemCallback);

    return filterStatisticStructure.getfilteredObjectIdsMappedByGroup();
};
export const getFilterItemsStatisticMap = curry(_getFilterItemsStatisticMap);

const _iterateOnItemCallback = (filterStatisticStructure, getFilterStatusForItem, itemId, item) =>  {
    const status = getFilterStatusForItem(item);
    filterStatisticStructure.addFilteredObjectStatus(status, itemId);
};
const iterateOnItemCallback = curry(_iterateOnItemCallback);


const _orderItemIdList = (itemIdListOrdered: number[], itemIdsValidated: {[number]: any}) =>
itemIdListOrdered.filter( itemId => itemIdsValidated[itemId] !== undefined)
export const orderItemIdList = curry(_orderItemIdList);










