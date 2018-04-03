//@flow

import type { FiltersGroupsCollection, FilteredObjectIdsMappedByGroup, FilterCriteria, FilterName } from '../types';
type FilterMatchingIdList = {[string]: [number]};

import { transformIntoObject, filterAgainstObjectKeys } from 'helpers/array/utils';
import { getPrimaryKeyListMatchingRange, getKeyRangeMatchingOperator } from '../helpers/idbStorage';
import { mapObjIndexed, mergeAll, curry } from 'ramda';
import { findIntersectionOfSortedArrays } from 'helpers/array/utils';

const _getFilterNextResult = 
async (filtersGroupsCollection: FiltersGroupsCollection, db, requestData, filteredObjectIdsMappedByGroup: FilteredObjectIdsMappedByGroup) => {
    
    const 
        {filters, universe} = requestData,
        filtersNotApplied = makeDifference(filtersCriteriasCollection, filters);

    return mapObjIndexed( (filterCriteria, filterName) => {
        const 
            filterGroup = filtersGroupsCollection[filterName],
            itemIdListMatchingFilterGroup = filterGroup ? filteredObjectIdsMappedByGroup.get(filterGroup) : filteredObjectIdsMappedByGroup.get(true),
            idListMappedToFilter = getItemIdListMatchingFilter(db, universe, filterCriteria, filterName);

        return findIntersectionOfSortedArrays(itemIdListMatchingFilterGroup, idListMappedToFilter);

    }, filtersNotApplied);

}
export const getFilterNextResult = curry(_getFilterNextResult);



const _getItemIdListMatchingFilter = async (db: IDBDatabase, universe: string, filterCriteria: FilterCriteria, filterName: FilterName): Promise<FilterMatchingIdList> => {
    const { operand } = filterCriteria;

    const 
        idListMatchingFilterPromise = Array.isArray(operand) ? getItemIdListMatchingFilterWithMultiOperand(db, universe, filterCriteria) : getItemIdListMatchingFilterWithSingleOperand(db, universe, filterCriteria),
        idListMatchingFilter = await idListMatchingFilterPromise;

    return {[filterName]: idListMatchingFilter};
    
};
export const getItemIdListMatchingFilter = curry(_getItemIdListMatchingFilter);


const _getItemIdListMatchingFilterWithSingleOperand = (db: IDBDatabase, universe: string, filterCriteria: FilterCriteria): Promise<FilterMatchingIdList> => {
    const { field, operand, operator } = filterCriteria;
    return getPrimaryKeyListMatchingRange(db, universe, field, getKeyRangeMatchingOperator(operator, operand));
}

const getItemIdListMatchingFilterWithSingleOperand = curry(_getItemIdListMatchingFilterWithSingleOperand);


const _getItemIdListMatchingFilterWithMultiOperand = (db: IDBDatabase, universe: string, filterCriteria: FilterCriteria): Promise<FilterMatchingIdList> => {
    const { field, operand, operator } = filterCriteria;

    //$FlowFixMe
    const allOperandMatchingIdListPromise = operand.map( operand => 
        getPrimaryKeyListMatchingRange(db, universe, field, getKeyRangeMatchingOperator(operator, operand))
        .then(matchingIdList => ( {[operand.toString()]: matchingIdList} )) 
    );

    return Promise.all(allOperandMatchingIdListPromise).then( allOperandMatchingIdList => mergeAll(allOperandMatchingIdList) );
};
const getItemIdListMatchingFilterWithMultiOperand = curry(_getItemIdListMatchingFilterWithMultiOperand);