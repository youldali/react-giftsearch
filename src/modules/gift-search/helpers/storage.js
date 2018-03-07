//@flow

import type { FieldsToIndexByUniverse, FieldsToIndex, IndexConfig } from 'modules/gift-search/storage.config';
import { curry, mapObjIndexed, map } from 'ramda';

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

const _getFieldIds = (db: IDBDatabase, storeName: string, indexName: string, keyRange: IDBKeyRange) => {
    const transaction = db.transaction(storeName, 'readonly')
    const objectStore = transaction.objectStore(storeName);
    const index = objectStore.index(indexName);

    const request: IDBRequest = index.getAll(keyRange);


    request.onsuccess = () => Promise.resolve(request.result);

    request.onerror = function(event) {
        Promise.reject(event);
    }
}

const _getKeyRange = (value) => !Array.isArray(value) ? IDBKeyRange.only(value) : IDBKeyRange.bound(value[0], value[1]);
