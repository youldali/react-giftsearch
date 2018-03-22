//@flow

import filterConfig from '../config/filter.config';
import storageConfig from '../config/storage.config';
import getFilteringDataFromFilters from './filterFunctionBuilder';
import filter from './filter';
import { createOrOpenDatabase, iterateOverBoxesInUniverse } from './storage';
import { createFilterStatisticStructure } from './filterStatistic';

const {dbName, dbVersion, fieldsToIndexByUniverse} = storageConfig;
onmessage = function(event) {
    const {universe, filters, orderBy, page} = event.data;
    postMessage(workerResult);

    //filter function builder
    const {filtersCriterias, filtersGroups} = filterConfig[universe];
    const {filterFunctionListByGroup, filterFunctionListMappedToFilterGroup} = getFilteringDataFromFilters(filtersCriterias, filtersGroups, filters);

    //filter
    const getFilterStatusForItem = filter(filterFunctionListByGroup, filterFunctionListMappedToFilterGroup);
    const db = await createOrOpenDatabase(fieldsToIndexByUniverse, dbName, dbVersion);
    iterateOverBoxesInUniverse (db, universe, getFilterStatusForItem)
}


const filterStatisticStructure = createFilterStatisticStructure();
const filterFunction = (itemId, item) =>  {
    const status = getFilterStatusForItem(item);
    filterStatisticStructure.addFilteredObjectStatus(status, itemId);
}

