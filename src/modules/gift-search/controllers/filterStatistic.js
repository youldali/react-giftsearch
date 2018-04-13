//@flow

import type { FiltersGroupsCollection, FilteredObjectIdsMappedByGroup, FilterCriteria, FilterName, FiltersCriteriasCollection, FiltersSelectedState, FilterStructure, FilterStructureMap } from '../types';

import { getPrimaryKeyListMatchingRange, getKeyRangeMatchingOperator } from '../helpers/idbStorage';
import { getIsFilterOperandSelected } from '../helpers/filterOperandResolver';
import getFilterOperandStatistic from '../helpers/filterOperandStatistic';
import { findIntersectionOfSortedArrays, liftInArray } from 'helpers/array/utils';
import { map, mergeAll, curry } from 'ramda';

type IdListMatchingOperands = {[string] : number};
type IdListMatchingFilterOperands = {[FilterName]: IdListMatchingOperands};


const _getFiltersStatistics = (db: IDBDatabase, requestData, filterStructureMap: FilterStructureMap, filteredObjectIdsMappedByGroup: FilteredObjectIdsMappedByGroup) => 
    map(getFilterStatistic(db, requestData, filteredObjectIdsMappedByGroup), filterStructureMap);

export const getFiltersStatistics = curry(_getFiltersStatistics);


const _getFilterStatistic = (db: IDBDatabase, requestData, filteredObjectIdsMappedByGroup: FilteredObjectIdsMappedByGroup, filterStructure: FilterStructure): Promise<IdListMatchingFilterOperands> => {
    const 
        { filtersSelectedState, universe } = requestData,
        { filterName, filterGroup, field, operator, operand } = filterStructure,
        operandList = Array.isArray(operand) ? operand : [operand];

    const getOperandStatistic = (operand) => {
        //!!!
        const isFilterOperandSelected = getIsFilterOperandSelected(filtersSelectedState, filterName);
            
        return (
            getPrimaryKeyListMatchingRange(db, universe, field, getKeyRangeMatchingOperator(operator, operand))
            .then ( idListMatchingOperand =>  (
                {
                    [operand.toString()]: getFilterOperandStatistic(filteredObjectIdsMappedByGroup, idListMatchingOperand, isFilterOperandSelected, filterGroup) 
                }
            ))
        );
    };


    const operandStatisticListPromise = map(getOperandStatistic, operandList);
    return Promise.all(operandStatisticListPromise).then( operandStatisticList => mergeAll(operandStatisticList) );
};
export const getFilterStatistic = curry(_getFilterStatistic);