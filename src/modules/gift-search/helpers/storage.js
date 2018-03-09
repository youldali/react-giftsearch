//@flow

import type { FieldsToIndexByUniverse, FieldsToIndex, IndexConfig } from 'modules/gift-search/storage.config';
import type { FilterCriteria, FilterGroup } from 'modules/gift-search/filter.config';
import type { Operator } from 'modules/actions/types';

import { curry, mapObjIndexed, map } from 'ramda';
import { FilterValue } from '../../actions/types';

export
const createOrOpenDatabase = (fieldsToIndexByUniverse: FieldsToIndexByUniverse): Promise<IDBDatabase> => {
    const dbName = "smartbox-gift-search";
    const version = 1;
    const openDBRequest = window.indexedDB.open(dbName, version);

    return new Promise((resolve, reject) => {
        openDBRequest.onerror = () => reject('error opening DB: ' + openDBRequest.error);
        openDBRequest.onupgradeneeded = () => createUniversesStores(openDBRequest.result, fieldsToIndexByUniverse);
        openDBRequest.onsuccess = () => resolve(openDBRequest.result);
    });
}

const _createUniversesStores = (db: IDBDatabase, fieldsToIndexByUniverse: FieldsToIndexByUniverse) => 
mapObjIndexed(createUniverseStore(db), fieldsToIndexByUniverse);

const createUniversesStores = curry(_createUniversesStores);


const _createUniverseStore = (db: IDBDatabase, fieldsToIndex: FieldsToIndex, universe: string) => {
    const objectStore = db.createObjectStore(universe, { keyPath: "id" });
    const fieldsToIndexTuples = Object.entries(fieldsToIndex);

    fieldsToIndexTuples.forEach( ([indexName, indexConfig]) => objectStore.createIndex(indexName, indexName, indexConfig || {}) );
};
const createUniverseStore = curry(_createUniverseStore);


const _addDataToUniverse = (db: IDBDatabase, universe: string, data: Object[]): Promise<any> => {
    const transaction = db.transaction([universe], "readwrite");
    const objectStore = transaction.objectStore(universe);
    
    data.forEach( row => objectStore.add(row) );
    return new Promise((resolve, reject) => {
        transaction.oncomplete = () => resolve();
        transaction.onerror = () => reject(`error inserting data for universe ${universe}: ${transaction.error}`);
    });
};
export const addDataToUniverse = curry(_addDataToUniverse);


//filter Number

const _getFilterNumber = (db: IDBDatabase, universe: string, filterCriteria: FilterCriteria, filterValueFallback: FilterValue) => {
    const {field, operator, value} = filterCriteria,
        filterValue = value || filterValueFallback;

    const result = {};
    
    if(Array.isArray(value)){
        value.forEach(v => {
            const keyRange = getKeyRangeFromOperator(operator, v);
            const r = getFieldIds(db, universe, field, keyRange);
            result[v] = r;
        })
    }
    else {
        const keyRange = getKeyRangeFromOperator(operator, filterValue);
        const r = getFieldIds(db, universe, field, keyRange);
        result[v] = r;
    }

    return result;
};




const _getFieldIds = (db: IDBDatabase, storeName: string, indexName: string, keyRange: IDBKeyRange) => {
    const transaction = db.transaction(storeName, 'readonly'),
        objectStore = transaction.objectStore(storeName),
        index = objectStore.index(indexName);
        request: IDBRequest = index.getAllKeys(keyRange);

    return new Promise((resolve, reject) => {
        request.onsuccess = () => Promise.resolve(request.result);
        request.onerror = () => reject('error fetching data: ' + request.error);;
    });
};
export const getFieldIds = curry(_getFieldIds);

const _getKeyRangeFromOperator = (operator: Operator, value: FilterValue) => {
    switch(operator){
        case '===':
        case 'isIncluded':
        case 'hasOneInCommon':
            return IDBKeyRange.only(value);
        case '<':
            return IDBKeyRange.upperBound(value, true);
        case '<=':
            return IDBKeyRange.upperBound(value);
        case '>':
            return IDBKeyRange.lowerBound(value, true);
        case '>=':
            return IDBKeyRange.lowerBound(value);
        case 'inRangeClosed':
            return IDBKeyRange.bound(value[0], value[1]);
        case 'inRangeOpen':
            return IDBKeyRange.bound(value[0], value[1], true, true);
        case 'inRangeOpenClosed':
            return IDBKeyRange.bound(value[0], value[1], true, false);
        case 'inRangeClosedOpen':
            return IDBKeyRange.bound(value[0], value[1], false, true);
    }
}
export const getKeyRangeFromOperator = curry(_getKeyRangeFromOperator);
