//@flow

import type { FieldsToIndexByUniverse, FieldsToIndex, Operator, FilterOperand, FilterStructure } from '../types';

import { createOrOpenDatabase, addDataToStore, getNumberOfItemsInStore, getPrimaryKeyListMatchingRange, getItemList, getAllUniqueKeysForIndex } from 'helpers/storage/idbStorage';
import { curry, mapObjIndexed, reverse } from 'ramda';
import storageConfig from '../config/storage.config';
import fetchGiftRemotely from '../helpers/fetchGiftsRemotely';

const { dbName, dbVersion, fieldsToIndexByUniverse } = storageConfig;
const { indexedDB, IDBKeyRange } = window;

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
    const itemList = await fetchGiftRemotely(universe);
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
    return getItemList(db, universe, universe, idList);
}
export const getBoxesList = curry(_getBoxesList);


const _getKeyRangeMatchingOperator = (operator: Operator, operand: FilterOperand) => {
    switch(operator){
        case '===':
        case 'isIncluded':
        case 'hasOneInCommon':
        case 'contains':
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