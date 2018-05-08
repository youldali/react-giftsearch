//@flow

import type { BoxesIdMappedByFilteredStatus, FilterStructure, FilterStructureMap } from '../types';
import type { BoxCollectionRequestData } from 'modules/actions/types';

import { getPrimaryKeyListMatchingRange, getKeyRangeMatchingOperator } from '../helpers/idbStorage';
import { getIsFilterOperandSelected } from '../helpers/filterOperandResolver';
import helperGetFilterStatistic  from '../helpers/filterStatistic';
import { findIntersectionOfSortedArrays, liftInArray } from 'helpers/array/utils';
import { map, mergeAll, curry } from 'ramda';

type IdListMatchingFilter= {[FilterName] : number};

const _getFiltersStatistics = (requestData: BoxCollectionRequestData, filterStructureMap: FilterStructureMap, boxesIdMappedByFilteredStatus: BoxesIdMappedByFilteredStatus) => {

    const { filtersApplied, universe } = requestData;

    const getFilterStatistic = async (filterStructure: FilterStructure): Promise<IdListMatchingFilter> => {
        const 
            { filterName, filterGroup} = filterStructure,
            isFilterSelected = filtersApplied[filterName],
            idListMatchingFilter = await getItemIdListMatchingSingleFilter(universe, filterStructure);
            return helperGetFilterStatistic(boxesIdMappedByFilteredStatus, idListMatchingFilter, isFilterSelected, filterGroup)
    };

    map(getFilterStatistic, filterStructureMap);

}

export const getFiltersStatistics = curry(_getFiltersStatistics);

