//@flow

import type { BoxesIdMappedByFilteredStatus, FilterStructure, FilterStructureMap } from '../types';
import type { BoxCollectionRequestData } from 'modules/actions/types';

import { getItemIdListMatchingSingleFilter } from '../services/idbStorageService';
import helperGetFilterStatistic  from '../filteringHelpers/filterStatistic';
import { findIntersectionOfSortedArrays, liftInArray } from 'helpers/array/utils';
import { has, map, mergeAll, curry } from 'ramda';
import 'core-js/fn/object/values';

type BoxesIdMatchingFilter= {[FilterName] : number};

const _getFiltersStatistics = (requestData: BoxCollectionRequestData, filterStructureMap: FilterStructureMap, boxesIdMappedByFilteredStatus: BoxesIdMappedByFilteredStatus): Promise<BoxesIdMatchingFilter> => {
    const { filtersApplied, universe } = requestData;

    const getFilterStatistic = async (filterStructure: FilterStructure): Promise<BoxesIdMatchingFilter> => {
        const 
            {filterName, filterGroup} = filterStructure,
            isFilterSelected = has(filterName, filtersApplied) ? true : false,
            boxesIdMatchingFilter = await getItemIdListMatchingSingleFilter(universe, filterStructure);
            return {
                [filterName]: helperGetFilterStatistic(boxesIdMappedByFilteredStatus, boxesIdMatchingFilter, isFilterSelected, filterGroup)
            };
    };

    const filterStatisticsPromise = map(getFilterStatistic, Object.values(filterStructureMap));
    return Promise.all(filterStatisticsPromise)
            .then(filterStatisticList => mergeAll(filterStatisticList));
}

export const getFiltersStatistics = curry(_getFiltersStatistics);

