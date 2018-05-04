//@flow
import type { BoxesIdMappedByFilteredStatus, FilterStructureMap } from '../types';
import type { BoxCollectionRequestData } from 'modules/actions/types';

import getFilterFunctionsData from '../filteringHelpers/filterFunctionBuilder';
import getFilterStatusForItem from '../filteringHelpers/filterStatus';
import createBoxesFilteredStatusStructure from '../filteringHelpers/filteredBoxesStatusStructure';
import { iterateOverBoxes } from '../services/idbStorageService';
import { curry } from 'ramda';


const _getFilterItemsStatisticMap = async (requestData: BoxCollectionRequestData, filterStructureMap: FilterStructureMap): Promise<BoxesIdMappedByFilteredStatus> => {
    const {universe, filtersApplied} = requestData;
    
    //filter function builder
    const {filterFunctionListByGroup, filterFunctionListMappedToFilterGroup} = getFilterFunctionsData(filterStructureMap, filtersApplied);

    //filtering
    const 
        appliedGetFilterStatusForItem = getFilterStatusForItem(filterFunctionListByGroup, filterFunctionListMappedToFilterGroup),
        filterStatisticStructure = createBoxesFilteredStatusStructure(),
        appliedIterateOnItemCallback = iterateOnItemCallback(filterStatisticStructure, appliedGetFilterStatusForItem);

    await iterateOverBoxes(universe, appliedIterateOnItemCallback);

    return filterStatisticStructure.getBoxesIdMappedByFilteredStatus();
};
export const getFilterItemsStatisticMap = curry(_getFilterItemsStatisticMap);


const _iterateOnItemCallback = (filterStatisticStructure, getFilterStatusForItem, itemId, item) =>  {
    const status = getFilterStatusForItem(item);
    filterStatisticStructure.addFilteredObjectStatus(status, itemId);
};
const iterateOnItemCallback = curry(_iterateOnItemCallback);











