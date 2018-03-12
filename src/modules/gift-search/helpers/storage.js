//@flow

import type { FieldsToIndexByUniverse, FieldsToIndex, IndexConfig } from 'modules/gift-search/storage.config';
import type { FilterCriteria, FilterGroup } from 'modules/gift-search/filter.config';
import type { Operator, FilterOperand } from 'modules/actions/types';

import { curry, mapObjIndexed } from 'ramda';

const _createUniverseStore = (db: IDBDatabase, fieldsToIndex: FieldsToIndex, universe: string) => {
    const 
        objectStore = db.createObjectStore(universe, { keyPath: "id" }),
        fieldsToIndexTuples = Object.entries(fieldsToIndex);

    //$FlowFixMe
    fieldsToIndexTuples.forEach( ([indexName, indexConfig]) => objectStore.createIndex(indexName, indexName, indexConfig ) );
};
const createUniverseStore = curry(_createUniverseStore);


const _createUniversesStores = (db: IDBDatabase, fieldsToIndexByUniverse: FieldsToIndexByUniverse) => 
mapObjIndexed(createUniverseStore(db), fieldsToIndexByUniverse);
const createUniversesStores = curry(_createUniversesStores);


export
const createOrOpenDatabase = (fieldsToIndexByUniverse: FieldsToIndexByUniverse, dbName: string, dbVersion: number): Promise<IDBDatabase> => {
    const openDBRequest = window.indexedDB.open(dbName, dbVersion);

    return new Promise((resolve, reject) => {
        openDBRequest.onerror = () => reject('error opening DB: ' + openDBRequest.error);
        openDBRequest.onupgradeneeded = () => createUniversesStores(openDBRequest.result, fieldsToIndexByUniverse);
        openDBRequest.onsuccess = () => resolve(openDBRequest.result);
    });
}


const _addDataToUniverse = (db: IDBDatabase, universe: string, data: Object[]): Promise<any> => {
    const 
        transaction = db.transaction([universe], "readwrite"),
        objectStore = transaction.objectStore(universe);
    
    data.forEach( row => objectStore.add(row) );
    return new Promise((resolve, reject) => {
        transaction.oncomplete = () => resolve();
        transaction.onerror = () => reject(`error inserting data for universe ${universe}: ${transaction.error.message}`);
    });
};
export const addDataToUniverse = curry(_addDataToUniverse);


const _getFilterNumber = (db: IDBDatabase, universe: string, filterCriteria: FilterCriteria, filterOperandFallback: FilterOperand) => {
    const 
        {field, operator, operand} = filterCriteria,
        nonNullOperand = operand || filterOperandFallback,
        mOperand = Array.isArray(nonNullOperand) ? nonNullOperand : [nonNullOperand];

    const result = {};
    mOperand.forEach(operandValue => {
        const keyRange = getKeyRangeMatchingOperator(operator, operandValue);
        result[operandValue] = getFieldIds(db, universe, field, keyRange);
    });
    
    return result;
};
export const getFilterNumber = curry(_getFilterNumber);


const _getFieldIds = (db: IDBDatabase, storeName: string, indexName: string, keyRange: IDBKeyRange) => {
    const 
        transaction = db.transaction(storeName, 'readonly'),
        objectStore = transaction.objectStore(storeName),
        index = objectStore.index(indexName),
        request: IDBRequest = index.getAllKeys(keyRange);

    return new Promise((resolve, reject) => {
        request.onsuccess = () => Promise.resolve(request.result);
        request.onerror = () => reject('error fetching data: ' + request.error.message);
    });
};
export const getFieldIds = curry(_getFieldIds);


const _getKeyRangeMatchingOperator = (operator: Operator, operand: FilterOperand) => {
    switch(operator){
        case '===':
        case 'isIncluded':
        case 'hasOneInCommon':
            return IDBKeyRange.only(operand);
        case '<':
            return IDBKeyRange.upperBound(operand, true);
        case '<=':
            return IDBKeyRange.upperBound(operand);
        case '>':
            return IDBKeyRange.lowerBound(operand, true);
        case '>=':
            return IDBKeyRange.lowerBound(operand);
        case 'inRangeClosed':
            return IDBKeyRange.bound(operand[0], operand[1]);
        case 'inRangeOpen':
            return IDBKeyRange.bound(operand[0], operand[1], true, true);
        case 'inRangeOpenClosed':
            return IDBKeyRange.bound(operand[0], operand[1], true, false);
        case 'inRangeClosedOpen':
            return IDBKeyRange.bound(operand[0], operand[1], false, true);
    }
}
export const getKeyRangeMatchingOperator = curry(_getKeyRangeMatchingOperator);


const _iterateOverBoxesInUniverse = (db: IDBDatabase, universe: string, callBack: Function) => {
    const 
        transaction = db.transaction(universe, 'readonly'),
        objectStore = transaction.objectStore(universe),
        request: IDBRequest = objectStore.openCursor();


    request.onsuccess = function(event) {
        const cursor = event.target.result;
        if(cursor) {
            callBack(cursor.primaryKey, cursor.value);
            cursor.continue();
        }
    };

    return new Promise((resolve, reject) => {
        transaction.oncomplete = () => Promise.resolve();
        transaction.onerror = () => reject('error fetching data: ' + transaction.error.message);
    });
};
export const iterateOverBoxesInUniverse = curry(_iterateOverBoxesInUniverse);
