//@flow
/* global location */
/* eslint no-restricted-globals: ["off", "self"] */

import filterConfig from '../config/filter.config';
import getFilterStructureMap from '../configHelpers/filterConfigResolver'
import getBoxesIdMappedByFilterStatus from './filter';
import getOrderedBoxIdList from './order';
import getPaginatedBoxList from './pagination';
import getFiltersStatistics, { getFiltersStatisticsSimplified } from './filterStatistic';
import { getNumberOfBoxes } from '../services/idbStorageService';

let lastRequestData = {};

const perPage = 10;

self.onmessage = async (event) => {
    const 
        requestData = event.data,
        { filtersApplied, orderBy, page, universe } = requestData,
        filterConfigForUniverse = filterConfig[universe];

    const filterStructureMap = await getFilterStructureMap(universe, filterConfigForUniverse);

    const 
        boxesIdMappedByFilteredStatus = await getBoxesIdMappedByFilterStatus(requestData, filterStructureMap),
        orderedBoxIdList = await getOrderedBoxIdList(requestData, boxesIdMappedByFilteredStatus.get(true)),
        paginatedBoxList = await getPaginatedBoxList(requestData, perPage, orderedBoxIdList);

    self.postMessage({ type: 'BOX_LIST', boxList: paginatedBoxList });
        

    const 
        filtersStatisticsDetailedByFilter = await getFiltersStatistics(requestData, filterStructureMap, boxesIdMappedByFilteredStatus),
        filtersStatisticsSimplifiedByFilter = getFiltersStatisticsSimplified(filtersStatisticsDetailedByFilter);

    const 
        totalNumberOfBoxes = await getNumberOfBoxes(universe),
        boxesStatistics = {
            filtersStatisticsByFilter: filtersStatisticsSimplifiedByFilter,
            numberOfMatchingBoxes: boxesIdMappedByFilteredStatus.get(true).length,
            totalNumberOfBoxes,
        };

    self.postMessage({ type: 'BOXES_STATISTICS', boxesStatistics });
};


const onFilterChanged = (requestData) => {

}

const onOrderChanged = async () => {
   
}



const _getFilterItemsStatisticMap = async () => {

};









