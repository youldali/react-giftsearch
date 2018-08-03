//@flow
/* global location */
/* eslint no-restricted-globals: ["off", "self"] */

import type { Box, BoxId, BoxesIdMappedByFilteredStatus, FilterStatisticDetailed, FilterStatisticSimplified } from '../types';
import type { BoxCollectionRequestData } from 'modules/actions/types';

import filterConfig from '../config/filter.config';
import getFilterStructureMap from '../configHelpers/filterConfigResolver'
import getBoxesIdMappedByFilterStatus from './filter';
import getOrderedBoxIdList from './order';
import getPaginatedBoxList from './pagination';
import getFiltersStatistics, { getFiltersStatisticsSimplified } from './filterStatistic';
import { getNumberOfBoxes } from '../services/idbStorageService';
import { composeP, equals, pick } from 'ramda';


type BoxListComputation = {
    boxesIdMappedByFilteredStatus: ?BoxesIdMappedByFilteredStatus,
    orderedBoxIdList: ?BoxId[],
    paginatedBoxList: ?Box[],
};

type FiltersStatisticsComputation = {
    filtersStatisticsDetailedByFilter: ?FilterStatisticDetailed,
    filtersStatisticsByFilter: ?FilterStatisticSimplified,
    numberOfMatchingBoxes: number,
    totalNumberOfBoxes: number,
};

let 
    lastRequestData = {
        universe: null,
        filtersApplied: null,
        orderBy: null,
        page: null,
    },
    lastBoxListComputation: BoxListComputation = {
        boxesIdMappedByFilteredStatus: null,
        orderedBoxIdList: null,
        paginatedBoxList: null,
    },
    lastFilterStatisticComputation: FiltersStatisticsComputation = {
        filtersStatisticsDetailedByFilter: null,
        filtersStatisticsByFilter: null,
        numberOfMatchingBoxes: 0,
        totalNumberOfBoxes: 0,
    };

const perPage = 10;


const 
    FILTERING_CHANGE = 1,
    ORDERING_CHANGE = 2,
    PAGINATION_CHANGE = 3;

self.onmessage = async (event) => {
    const requestData: BoxCollectionRequestData = event.data;
    processBoxRequest(requestData);
};


const processBoxRequest = async (requestData: BoxCollectionRequestData) => {
    const {universe, filtersApplied, orderBy, page} = requestData;

    const levelChange = 
        universe !== lastRequestData.universe || !equals(filtersApplied, lastRequestData.filtersApplied) ? FILTERING_CHANGE :
        orderBy !== lastRequestData.orderBy ? ORDERING_CHANGE :
        page !== lastRequestData.page ? PAGINATION_CHANGE :
        null;

    
    const doBoxListComputation = (previousBoxListComputation: BoxListComputation) => {
        const 
            { universe } = requestData,
            filterConfigForUniverse = filterConfig[universe];
    
        const newBoxListComputation = Object.assign({}, previousBoxListComputation);
        
        const 
            onFilterChanged = async (filterStructureMap) => {
                const boxesIdMappedByFilteredStatus = await getBoxesIdMappedByFilterStatus(requestData, filterStructureMap);
    
                newBoxListComputation.boxesIdMappedByFilteredStatus = boxesIdMappedByFilteredStatus;
                return boxesIdMappedByFilteredStatus;
            },
            onOrderingChanged = async (boxesIdMappedByFilteredStatus) => {
                const orderedBoxIdList = await getOrderedBoxIdList(requestData, boxesIdMappedByFilteredStatus.get(true));
    
                newBoxListComputation.orderedBoxIdList = orderedBoxIdList;
                return orderedBoxIdList;
            },
            onPaginationChanged = async (orderedBoxIdList) => {
                const paginatedBoxList = await getPaginatedBoxList(requestData, perPage, orderedBoxIdList);
    
                newBoxListComputation.paginatedBoxList = paginatedBoxList;
                return paginatedBoxList;
            };
    
        levelChange === FILTERING_CHANGE ? composeP(onPaginationChanged, onOrderingChanged, onFilterChanged, getFilterStructureMap)(universe, filterConfigForUniverse) : 
        levelChange === ORDERING_CHANGE ? composeP(onPaginationChanged, onOrderingChanged)(previousBoxListComputation.boxesIdMappedByFilteredStatus) :
        levelChange === PAGINATION_CHANGE ? onPaginationChanged(previousBoxListComputation.orderedBoxIdList) :
        previousBoxListComputation.paginatedBoxList

        return newBoxListComputation;
    };

    const doFiltersStatisticsComputation = (previousFiltersStatisticsComputation: FiltersStatisticsComputation) => {
        const 
            { universe } = requestData,
            filterConfigForUniverse = filterConfig[universe],
            { boxesIdMappedByFilteredStatus } = lastBoxListComputation;
    
        const onFilteringChanged = async () => {
            const filterStructureMap = await getFilterStructureMap(universe, filterConfigForUniverse);
    
            const 
                filtersStatisticsDetailedByFilter = await getFiltersStatistics(requestData, filterStructureMap, boxesIdMappedByFilteredStatus),
                filtersStatisticsByFilter = getFiltersStatisticsSimplified(filtersStatisticsDetailedByFilter);
    
            const 
                totalNumberOfBoxes = await getNumberOfBoxes(universe),
                newFiltersStatisticsComputation = {
                    filtersStatisticsDetailedByFilter,
                    filtersStatisticsByFilter,
                    numberOfMatchingBoxes: boxesIdMappedByFilteredStatus.get(true).length,
                    totalNumberOfBoxes,
                };
    
            return newFiltersStatisticsComputation;
        };
    
        return levelChange === FILTERING_CHANGE ? onFilteringChanged() : previousFiltersStatisticsComputation;
    };

    const 
        boxListComputation = await doBoxListComputation(lastBoxListComputation),
        {boxList} = boxListComputation;
    levelChange && postBoxList(boxList);

    const 
        filtersStatisticsComputation = await doFiltersStatisticsComputation(lastFilterStatisticComputation),
        boxesStatistics = pick(['filtersStatisticsByFilter', 'numberOfMatchingBoxes', 'totalNumberOfBoxes'], filtersStatisticsComputation);
    levelChange === FILTERING_CHANGE && postBoxesStatistics(boxesStatistics);


    lastBoxListComputation = boxListComputation;
    lastFilterStatisticComputation = filtersStatisticsComputation;
    lastRequestData = requestData;
}

const postBoxList = (boxList) => {
    self.postMessage({ type: 'BOX_LIST', boxList: boxList });
};

const postBoxesStatistics = (boxesStatistics) => {
    self.postMessage({ type: 'BOXES_STATISTICS', boxesStatistics });
};


