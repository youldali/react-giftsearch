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
import { composeP, equals } from 'ramda';

let 
    lastRequestData = {
        universe: null,
        filtersApplied: null,
        orderBy: null,
        page: null,
    },
    lastBoxListComputation = {
        boxesIdMappedByFilteredStatus: null,
        orderedBoxIdList: null,
        paginatedBoxList: null,
    },
    lastFilterStatisticComputation = {
        filtersStatisticsDetailedByFilter: null,
        filtersStatisticsSimplifiedByFilter: null,
    };

const perPage = 10;


const 
    FILTERING_CHANGE = 1,
    ORDERING_CHANGE = 2,
    PAGINATION_CHANGE = 3;

self.onmessage = async (event) => {
    const requestData = event.data;
    const {universe, filtersApplied, orderBy, page} = requestData;

    const levelChange = 
        universe !== lastRequestData.universe || !equals(filtersApplied, lastRequestData.filtersApplied) ? FILTERING_CHANGE :
        orderBy !== lastRequestData.orderBy ? ORDERING_CHANGE :
        page !== lastRequestData.page ? PAGINATION_CHANGE :
        null;


    const boxList = await doBoxListComputation(requestData, levelChange);
    postBoxList(boxList);

    const boxesStatistics = await doFiltersStatisticsComputation(requestData, levelChange);
    postBoxesStatistics(boxesStatistics);

    lastRequestData = requestData;
};


const doBoxListComputation = (requestData, levelChange) => {
    const 
        { universe } = requestData,
        filterConfigForUniverse = filterConfig[universe];

    const 
        onFilterChanged = async (filterStructureMap) => {
            const boxesIdMappedByFilteredStatus = await getBoxesIdMappedByFilterStatus(requestData, filterStructureMap);

            lastBoxListComputation.boxesIdMappedByFilteredStatus = boxesIdMappedByFilteredStatus;
            return boxesIdMappedByFilteredStatus;
        },
        onOrderingChanged = async (boxesIdMappedByFilteredStatus) => {
            const orderedBoxIdList = await getOrderedBoxIdList(requestData, boxesIdMappedByFilteredStatus.get(true));

            lastBoxListComputation.orderedBoxIdList = orderedBoxIdList;
            return orderedBoxIdList;
        },
        onPaginationChanged = async (orderedBoxIdList) => {
            const paginatedBoxList = await getPaginatedBoxList(requestData, perPage, orderedBoxIdList);

            lastBoxListComputation.paginatedBoxList = paginatedBoxList;
            return paginatedBoxList;
        };

    return (
        levelChange === FILTERING_CHANGE ? composeP(onPaginationChanged, onOrderingChanged, onFilterChanged, getFilterStructureMap)(universe, filterConfigForUniverse) : 
        levelChange === ORDERING_CHANGE ? composeP(onPaginationChanged, onOrderingChanged)(lastBoxListComputation.boxesIdMappedByFilteredStatus) :
        levelChange === PAGINATION_CHANGE ? onPaginationChanged(lastBoxListComputation.orderedBoxIdList) :
        lastBoxListComputation.paginatedBoxList
    );
};


const doFiltersStatisticsComputation = (requestData, levelChange) => {
    const 
        { universe } = requestData,
        filterConfigForUniverse = filterConfig[universe],
        { boxesIdMappedByFilteredStatus } = lastBoxListComputation;

    const onFilteringChanged = async () => {
        const filterStructureMap = await getFilterStructureMap(universe, filterConfigForUniverse);

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

        lastFilterStatisticComputation = {filtersStatisticsDetailedByFilter, filtersStatisticsSimplifiedByFilter};

        return boxesStatistics;
    };

    const onFilteringUnchanged = async () => {
        const 
            totalNumberOfBoxes = await getNumberOfBoxes(universe),
            boxesStatistics = {
                filtersStatisticsByFilter: lastFilterStatisticComputation.filtersStatisticsSimplifiedByFilter,
                numberOfMatchingBoxes: boxesIdMappedByFilteredStatus.get(true).length,
                totalNumberOfBoxes,
            };

        return boxesStatistics;
    };

    return (
        levelChange === FILTERING_CHANGE ? onFilteringChanged() : onFilteringUnchanged()
    )
};


const postBoxList = (boxList) => {
    self.postMessage({ type: 'BOX_LIST', boxList: boxList });
};

const postBoxesStatistics = (boxesStatistics) => {
    self.postMessage({ type: 'BOXES_STATISTICS', boxesStatistics });
};


