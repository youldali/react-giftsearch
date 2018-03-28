//@flow
import type { FilteredObjectIdsMappedByGroup } from '../types';

import getFilteringDataFromFilters from '../helpers/filterFunctionBuilder';
import getFilterStatusForItem from '../helpers/filterStatus';
import { iterateOverBoxesInUniverse } from '../helpers/idbStorage';
import { createFilterStatisticStructure } from '../helpers/filterStatistic';
import { curry } from 'ramda';


const _getFilterItemsStatisticMap = async (db, requestData, filtersCriterias, filtersGroups) => {
    const {universe, filters} = requestData;
    
    //filter function builder
    const {filterFunctionListByGroup, filterFunctionListMappedToFilterGroup} = getFilteringDataFromFilters(filtersCriterias, filtersGroups, filters);

    //filter
    const 
        appliedGetFilterStatusForItem = getFilterStatusForItem(filterFunctionListByGroup, filterFunctionListMappedToFilterGroup),
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











