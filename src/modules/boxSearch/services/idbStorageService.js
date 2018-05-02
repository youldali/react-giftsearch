//@flow

import type { FieldsToIndex, FieldsToIndexByUniverse, FilterOperand, FilterStructure } from '../types';

import { createOrOpenDatabase, addDataToStore, getNumberOfItemsInStore, getPrimaryKeyListMatchingRange, getItemList, getAllUniqueKeysForIndex, getKeyRangeMatchingOperator } from 'helpers/storage/idbStorage';
import { curry, mapObjIndexed, reverse } from 'ramda';
import storageConfig from '../config/storage.config';
import fetchBoxListService from './fetchBoxListService';

const { dbName, dbVersion, fieldsToIndexByUniverse } = storageConfig;

const _createUniversesStores = (fieldsToIndexByUniverse: FieldsToIndexByUniverse, db: IDBDatabase) => {
    const createUniverseStore = (fieldsToIndex: FieldsToIndex, universe: string) => {
        const 
            objectStore = db.createObjectStore(universe, { keyPath: "id" }),
            fieldsToIndexTuples = Object.entries(fieldsToIndex);
    
        //$FlowFixMe
        fieldsToIndexTuples.forEach( ([indexName, indexConfig]) => objectStore.createIndex(indexName, indexName, indexConfig) );
    };

    mapObjIndexed(createUniverseStore, fieldsToIndexByUniverse);
}
const createUniversesStores = curry(_createUniversesStores);


const addDataToUniverse = async (db: IDBDatabase, universe: string) => {
    const itemList = await fetchBoxListService(universe);
    return addDataToStore(db, universe, itemList);
}


const openGiftSearchDatabase = async (universe: string) => {
    const db = await createOrOpenDatabase(dbName, dbVersion, createUniversesStores(fieldsToIndexByUniverse));
    await getNumberOfItemsInStore(db, universe) || await addDataToUniverse(db, universe);
    return db;
}


const _getItemIdListMatchingSingleFilter = async (universe: string, filterStructure: FilterStructure) => {
    const 
        db = await openGiftSearchDatabase(universe),
        { field, operator, operand } = filterStructure;

    return getPrimaryKeyListMatchingRange(db, universe, field, getKeyRangeMatchingOperator(operator, operand));
}
export const getItemIdListMatchingSingleFilter = curry(_getItemIdListMatchingSingleFilter);


const _getOperandList = async (universe: string, field: string) => {
    const db = await openGiftSearchDatabase(universe);
    return getAllUniqueKeysForIndex(db, universe, field);
}
export const getOperandList = curry(_getOperandList);


const _getBoxesList = async (universe: string, idList: number[]) => {
    const db = await openGiftSearchDatabase(universe);
    return getItemList(db, universe, idList);
}
export const getBoxesList = curry(_getBoxesList);