//@flow

import type { FiltersGroupsCollection, FilteredObjectIdsMappedByGroup, FilterCriteria, FilterName, FiltersCriteriasCollection } from '../types';
type IdListMatchingOperands = {[string] : number};
type IdListMatchingFilterOperands = {[FilterName]: IdListMatchingOperands};

import { getPrimaryKeyListMatchingRange, getKeyRangeMatchingOperator } from '../helpers/idbStorage';
import { mapObjIndexed, mergeAll, curry } from 'ramda';
import { findIntersectionOfSortedArrays } from 'helpers/array/utils';

const _getFilterNextResult = 
async (filtersGroupsCollection: FiltersGroupsCollection, filtersCriteriasCollection: FiltersCriteriasCollection, db, requestData, filteredObjectIdsMappedByGroup: FilteredObjectIdsMappedByGroup) => {
    
    const {filters, universe} = requestData;

    return mapObjIndexed( (filterCriteria, filterName) => {
        const filterInfo = {
            filterName,
            filterGroup: filtersGroupsCollection[filterName],
            filterCriteria
        };
        return getItemIdListMatchingFilter(filteredObjectIdsMappedByGroup, db, universe, filterCriteria, filterInfo), filtersCriteriasCollection);
    };

}
export const getFilterNextResult = curry(_getFilterNextResult);


const _getItemIdListMatchingFilter = async (filteredObjectIdsMappedByGroup: FilteredObjectIdsMappedByGroup, db: IDBDatabase, requestData, filterInfo): Promise<IdListMatchingFilterOperands> => {
    const 
        idListMatchingFilterPromise = getItemIdListMatchingFilterOperands(db, requestData, filterInfo),
        idListMatchingFilter = await idListMatchingFilterPromise;

    return {[filterName]: idListMatchingFilter};
    
};
export const getItemIdListMatchingFilter = curry(_getItemIdListMatchingFilter);


const _getItemIdListMatchingFilterOperands = (filteredObjectIdsMappedByGroup: FilteredObjectIdsMappedByGroup, requestData, db: IDBDatabase, filterInfo): Promise<IdListMatchingOperands> => {
    const 
        { field, operand, operator } = filterCriteria,
        { filters, universe } = requestData,
        { filterName, filterGroup, filterCriteria } = filterInfo,
        mOperand = Array.isArray(operand) ? operand : [operand];

    //$FlowFixMe
    const allOperandMatchingIdListPromise = mOperand.map( operand => {
        const 
            itemIdListMatchingOperandOnly = await getPrimaryKeyListMatchingRange(db, universe, field, getKeyRangeMatchingOperator(operator, operand)),
            isFilterOperandSelected = isFilterOperandSelected(filters, filterName, operand);

        const appliedFindIntersectionOfSortedArrays = findIntersectionOfSortedArrays(itemIdListMatchingOperandOnly);
            
        const nextItemIdListMatchingOperand = isFilterOperandSelected || filterGroup === undefined 
        ? appliedFindIntersectionOfSortedArrays(filteredObjectIdsMappedByGroup.get(true)) 
        : appliedFindIntersectionOfSortedArrays(filteredObjectIdsMappedByGroup.get(filterGroup));
        
        return {[operand.toString()]: nextItemIdListMatchingOperand}
    });

    return Promise.all(allOperandMatchingIdListPromise).then( allOperandMatchingIdList => mergeAll(allOperandMatchingIdList) );
};
const getItemIdListMatchingFilterOperands = curry(_getItemIdListMatchingFilterOperands);




const isFilterOperandSelected = (filters: Filters, filterName, operand){
    const filterState = filters[filterName];
    return (
        filterState === undefined ? false :
        Array.isArray(filterState) ? filterState.includes(operand) : true;
    );
};
const isFilterOperandSelected = curry(_isFilterOperandSelected);