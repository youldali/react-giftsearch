//@flow

import type { FieldsToIndexByUniverse, FieldsToIndex, IndexConfig, FilterCriteria, FilterGroup, Operator, FilterOperand } from '../types';
import { curry, mapObjIndexed, reverse } from 'ramda';

const {indexedDB, IDBKeyRange} = window;

const _createUniverseStore = (db: IDBDatabase, fieldsToIndex: FieldsToIndex, universe: string) => {
    const 
        objectStore = db.createObjectStore(universe, { keyPath: "id" }),
        fieldsToIndexTuples = Object.entries(fieldsToIndex);

    //$FlowFixMe
    fieldsToIndexTuples.forEach( ([indexName, indexConfig]) => objectStore.createIndex(indexName, indexName, indexConfig) );
};
const createUniverseStore = curry(_createUniverseStore);


const _createUniversesStores = (db: IDBDatabase, fieldsToIndexByUniverse: FieldsToIndexByUniverse) => 
mapObjIndexed(createUniverseStore(db), fieldsToIndexByUniverse);
const createUniversesStores = curry(_createUniversesStores);


export
const createOrOpenDatabase = (fieldsToIndexByUniverse: FieldsToIndexByUniverse, dbName: string, dbVersion: number): Promise<IDBDatabase> => {
    const openDBRequest = indexedDB.open(dbName, dbVersion);

    return new Promise((resolve, reject) => {
        openDBRequest.onerror = () => reject(`error opening DB ${dbName}: ${openDBRequest.error}`);
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


const _getPrimaryKeyListMatchingRange= (db: IDBDatabase, storeName: string, indexName: string, keyRange: IDBKeyRange) => {
    const 
        transaction = db.transaction(storeName, 'readonly'),
        objectStore = transaction.objectStore(storeName),
        index = objectStore.index(indexName),
        //$FlowFixMe
        request: IDBRequest = index.getAllKeys(keyRange);

    return new Promise((resolve, reject) => {
        request.onsuccess = () => resolve(request.result);
        request.onerror = () => reject('error fetching data: ' + request.error.message);
    });
};
export const getPrimaryKeyListMatchingRange = curry(_getPrimaryKeyListMatchingRange);


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


const _iterateOverBoxesInUniverse = (db: IDBDatabase, universe: string, callBack: Function): Promise<any> => {
    const 
        transaction = db.transaction(universe, 'readonly'),
        objectStore = transaction.objectStore(universe),
        request = objectStore.openCursor();

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
        transaction = db.transaction(universe, 'readonly'),
        objectStore = transaction.objectStore(universe),
        index = objectStore.index(field),
        request = index.openKeyCursor(null, 'nextunique');

    const keyList = [];
    request.onsuccess = function(event) {
        const cursor = event.target.result;
        if(cursor) {
            keyList.push(cursor.key);
            cursor.continue();
        }
    };

    return new Promise((resolve, reject) => {
        transaction.oncomplete = () => resolve(keyList);
        transaction.onerror = () => reject('error fetching key list');
    });
};
export const getAllUniqueKeysForIndex = curry(_getAllUniqueKeysForIndex);


const _getAllPrimaryKeysForindex = (db: IDBDatabase, universe: string, field: string, reverseDirection: boolean) => {
    const 
        transaction = db.transaction(universe, 'readonly'),
        objectStore = transaction.objectStore(universe),
        index = objectStore.index(field),
        //$FlowFixMe
        request = index.getAllKeys();

    return new Promise((resolve, reject) => {
        request.onsuccess = () => resolve( reverseDirection ? reverse(request.result) : request.result );
        request.onerror = () => reject('error fetching data: ' + request.error.message);
    });
};
export const getAllPrimaryKeysForindex = curry(_getAllPrimaryKeysForindex);


const _getItemList = (db: IDBDatabase, universe: string, idList: number[]): Promise<any> => {
    const 
        transaction = db.transaction(universe, 'readonly'),
        objectStore = transaction.objectStore(universe),
        itemList = [];


    idList.forEach( id => {
        const request = objectStore.get(id);
        request.onsuccess = () => itemList.push(request.result);
    });

    return new Promise((resolve, reject) => {
        transaction.oncomplete = () => resolve(itemList);
        transaction.onerror = () => reject('error fetching the items');
    });
};
export const getItemList = curry(_getItemList);
