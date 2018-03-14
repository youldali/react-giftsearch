//@flow

import type { FieldsToIndexByUniverse, FieldsToIndex, IndexConfig } from 'modules/gift-search/storage.config';
import type { FilterCriteria, FilterGroup } from 'modules/gift-search/filter.config';
import type { Operator, FilterOperand } from 'modules/actions/types';

import { curry, mapObjIndexed, mergeAll } from 'ramda';

type FilterMatchingIdList = {[string]: [number]};

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
        transaction.onerror = () => reject(`error inserting data for universe ${universe}:`);
    });
};
export const addDataToUniverse = curry(_addDataToUniverse);


const _getFilterMatchingIdList = (db: IDBDatabase, universe: string, filterCriteria: FilterCriteria, filterOperandFallback: FilterOperand): Promise<FilterMatchingIdList> => {
    const operatorMultiValue = ['isIncluded', 'hasOneInCommon'];
    const 
        {field, operator, operand} = filterCriteria,
        nonNullOperand = operand || filterOperandFallback,
        mOperand = operatorMultiValue.includes(operator) ? nonNullOperand : [nonNullOperand];

    //$FlowFixMe
    const operandNumberListPromise = mOperand.map( operand => 
        getFieldIds(db, universe, field, getKeyRangeMatchingOperator(operator, operand))
        .then(matchingIdList => ( {[operand.toString()]: matchingIdList} )) 
    );

    return Promise.all(operandNumberListPromise).then((operandNumberList) => mergeAll(operandNumberList));
};
export const getFilterMatchingIdList = curry(_getFilterMatchingIdList);


const _getFieldIds = (db: IDBDatabase, storeName: string, indexName: string, keyRange: IDBKeyRange) => {
    const 
        transaction = db.transaction(storeName, 'readonly'),
        objectStore = transaction.objectStore(storeName),
        index = objectStore.index(indexName),
        request: IDBRequest = index.getAllKeys(keyRange);

    return new Promise((resolve, reject) => {
        request.onsuccess = () => resolve(request.result);
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
        transaction.oncomplete = () => resolve();
        transaction.onerror = () => reject('error fetching data: ' + transaction.error.message);
    });
};
export const iterateOverBoxesInUniverse = curry(_iterateOverBoxesInUniverse);

const _getAllUniqueKeysForIndex = (db: IDBDatabase, universe: string, field: string) => {
    const 
        transaction = db.transaction(storeName, 'readonly'),
        objectStore = transaction.objectStore(storeName),
        index = objectStore.index(indexName),
        request: IDBRequest = index.openCursor(null, 'nextunique');


    const keyList = [];
    request.onsuccess = function(event) {
        const cursor = event.target.result;
        if(cursor) {
            keyList.push(cursor.value);
            cursor.continue();
        }
    };

    return new Promise((resolve, reject) => {
        transaction.oncomplete = () => resolve(keyList);
        transaction.onerror = () => reject('error fetching key list');
    });
};
export const getAllUniqueKeysForIndex = curry(_getAllUniqueKeysForIndex);
