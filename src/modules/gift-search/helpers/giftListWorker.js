//@flow
import type { FilteredObjectIdsMappedByGroup } from '../types';

import filterConfig from '../config/filter.config';
import storageConfig from '../config/storage.config';
import getFilteringDataFromFilters from './filterFunctionBuilder';
import filter from './filter';
import { createOrOpenDatabase, iterateOverBoxesInUniverse, getAllUniqueKeysForIndex } from './storage';
import { createFilterStatisticStructure } from './filterStatistic';
import { curry } from 'ramda';
import { transformIntoObject } from 'helpers/array/utils';

const {dbName, dbVersion, fieldsToIndexByUniverse} = storageConfig;
onmessage = function(event) {
    //postMessage(workerResult);
}

const onFilterChanged = (data) => {
    const 
        {universe, filters, orderBy, page} = data,
        {filtersCriterias, filtersGroups} = filterConfig[universe];

    return getFilterItemsStatisticMap(universe, filters, orderBy, page, filtersCriterias, filtersGroups);
}

const onOrderChanged = async (universe, orderBy, filteredObjectIdsMappedByGroup: FilteredObjectIdsMappedByGroup) => {
    const db = await createOrOpenDatabase(fieldsToIndexByUniverse, dbName, dbVersion);
    const 
        validatedItemIdList = filteredObjectIdsMappedByGroup.get(true),
        fullObjectListOrder = await getAllUniqueKeysForIndex(db, universe, orderBy);

}



const _iterateOnItemCallback = (filterStatisticStructure, getFilterStatusForItem, itemId, item) =>  {
    const status = getFilterStatusForItem(item);
    filterStatisticStructure.addFilteredObjectStatus(status, itemId);
};
const iterateOnItemCallback = curry(_iterateOnItemCallback);


const _getFilterItemsStatisticMap = async (universe, filters, orderBy, page, filtersCriterias, filtersGroups) => {
    //filter function builder
    const {filterFunctionListByGroup, filterFunctionListMappedToFilterGroup} = getFilteringDataFromFilters(filtersCriterias, filtersGroups, filters);

    //filter
    const getFilterStatusForItem = filter(filterFunctionListByGroup, filterFunctionListMappedToFilterGroup);
    const db = await createOrOpenDatabase(fieldsToIndexByUniverse, dbName, dbVersion);

    const filterStatisticStructure = createFilterStatisticStructure();
    const appliedIterateOnItemCallback = iterateOnItemCallback(filterStatisticStructure, getFilterStatusForItem);
    await iterateOverBoxesInUniverse (db, universe, appliedIterateOnItemCallback);

    return filterStatisticStructure.getfilteredObjectIdsMappedByGroup();
};
const getFilterItemsStatisticMap = curry(_getFilterItemsStatisticMap);


const _orderItemIdList = (itemIdListOrdered: number[], itemIdsValidated: {[number]: any}) =>
itemIdListOrdered.filter( itemId => itemIdsValidated[itemId] !== undefined)
const orderItemIdList = curry(_orderItemIdList);










