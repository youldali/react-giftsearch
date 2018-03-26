//@flow
import type { FilteredObjectIdsMappedByGroup } from '../types';

import filterConfig from '../config/filter.config';
import storageConfig from '../config/storage.config';
import getFilteringDataFromFilters from '../helpers/filterFunctionBuilder';
import filter from '../helpers/filter';
import { createOrOpenDatabase, iterateOverBoxesInUniverse, getAllUniqueKeysForIndex } from '../helpers/storage';
import { createFilterStatisticStructure } from '../helpers/filterStatistic';
import { curry, compose } from 'ramda';
import { transformIntoObject } from 'helpers/array/utils';

const {dbName, dbVersion, fieldsToIndexByUniverse} = storageConfig;

onmessage = async function(event) {
    const db = await createOrOpenDatabase(fieldsToIndexByUniverse, dbName, dbVersion);
    //postMessage(workerResult);
}


const onFilterChanged = (requestData) => {
    const 
        {universe} = requestData,
        {filtersCriterias, filtersGroups} = filterConfig[universe];

    return getFilterItemsStatisticMap(requestData, filtersCriterias, filtersGroups);
}

const onOrderChanged = async (db, requestData, filteredObjectIdsMappedByGroup: FilteredObjectIdsMappedByGroup) => {
    const {universe, orderBy} = requestData;

    const 
        validatedItemIdObject = compose(transformIntoObject, filteredObjectIdsMappedByGroup.get(true)),
        fullObjectListOrder = await getAllUniqueKeysForIndex(db, universe, orderBy);

    return orderItemIdList(validatedItemIdObject, fullObjectListOrder);
}



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
const getFilterItemsStatisticMap = curry(_getFilterItemsStatisticMap);

const _iterateOnItemCallback = (filterStatisticStructure, getFilterStatusForItem, itemId, item) =>  {
    const status = getFilterStatusForItem(item);
    filterStatisticStructure.addFilteredObjectStatus(status, itemId);
};
const iterateOnItemCallback = curry(_iterateOnItemCallback);


const _orderItemIdList = (itemIdListOrdered: number[], itemIdsValidated: {[number]: any}) =>
itemIdListOrdered.filter( itemId => itemIdsValidated[itemId] !== undefined)
const orderItemIdList = curry(_orderItemIdList);










