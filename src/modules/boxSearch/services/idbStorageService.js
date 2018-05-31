//@flow

import type { BoxId, Box, FieldsToIndex, FieldsToIndexByUniverse, FilterOperand, FilterStructure } from '../types';

import { createOrOpenDatabase, addDataToStore, getAllPrimaryKeysForindex, getNumberOfItemsInStore, getPrimaryKeyListMatchingRange, getItemList, getAllUniqueKeysForIndex, getKeyRangeMatchingOperator, iterateOverStore } from 'helpers/storage/idbStorage';
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


const addDataToUniverse = (() => {
    const isFetching = {};

    return async (db: IDBDatabase, universe: string) => {
        if(isFetching[universe])
            return;
        
        isFetching[universe] = true;
        const response = await fetchBoxListService(universe);
        addDataToStore(db, universe, response.data);
        isFetching[universe] = false;

        return true;
    }
})();


const openGiftSearchDatabase = async (universe: string) => {
    const db = await createOrOpenDatabase(dbName, dbVersion, createUniversesStores(fieldsToIndexByUniverse));
    await getNumberOfItemsInStore(db, universe) || await addDataToUniverse(db, universe);
    return db;
}


const _getItemIdListMatchingSingleFilter = async (universe: string, filterStructure: FilterStructure): Promise<BoxId[]> => {
    const 
        db = await openGiftSearchDatabase(universe),
        { field, operator, operand } = filterStructure;

    return getPrimaryKeyListMatchingRange(db, universe, field, getKeyRangeMatchingOperator(operator, operand));
}
export const getItemIdListMatchingSingleFilter = curry(_getItemIdListMatchingSingleFilter);


const _getOperandList = async (universe: string, field: string): Promise<any> => {
    const db = await openGiftSearchDatabase(universe);
    return getAllUniqueKeysForIndex(db, universe, field);
}
export const getOperandList = curry(_getOperandList);


const _getBoxesList = async (universe: string, idList: BoxId[]): Promise<Box[]> => {
    const db = await openGiftSearchDatabase(universe);
    return getItemList(db, universe, idList);
}
export const getBoxesList = curry(_getBoxesList);


const _iterateOverBoxes = async (universe: string, callBack: Function): Promise<any> => {
    const db = await openGiftSearchDatabase(universe);
    return iterateOverStore(db, universe, callBack)
}
export const iterateOverBoxes = curry(_iterateOverBoxes);


export
const getAllBoxesIdOrderByField = async (universe: string, field: string, isReversedDirection: boolean): Promise<BoxId[]> => {
    const db = await openGiftSearchDatabase(universe);
    return getAllPrimaryKeysForindex(db, universe, field, isReversedDirection);
}


export
const getAllBoxesId = async (universe: string, isReversedDirection: boolean): Promise<BoxId[]> => {
    const db = await openGiftSearchDatabase(universe);
    return getAllPrimaryKeysForindex(db, universe, 'id', isReversedDirection);
}
