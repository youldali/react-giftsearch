import { compose, comparator, reduce, curry, reverse, sortBy, sort, prop } from 'ramda';

const idbStorage = jest.genMockFromModule('../idbStorage');
let itemCollection = {};


const _createOrOpenDatabase = (dbName: string, dbVersion: number, onUpgradeCallback: Function): Promise<IDBDatabase> => 
    Promise.resolve({});
export const createOrOpenDatabase = curry(_createOrOpenDatabase);


export const _getNumberOfItemsInStore = (db: IDBDatabase, storeName: string):Promise<number> => 
    Promise.resolve(itemCollection[storeName] ? itemCollection[storeName].length : 0);
export const getNumberOfItemsInStore = curry(_getNumberOfItemsInStore);


const _addDataToStore = (db: IDBDatabase, storeName: string, data: Object[] = []): Promise<any> => {
    itemCollection[storeName] === undefined ? itemCollection[storeName] = data : itemCollection[storeName].push(data);
    return Promise.resolve();
};
export const addDataToStore = curry(_addDataToStore);


const _getPrimaryKeyListMatchingRange = (db: IDBDatabase, storeName: string, indexName: string, keyRange: IDBKeyRange) => {
    const 
        { operator, operand } = keyRange,
        field = indexName;

    const 
        filtereditemCollection = itemCollection[storeName].filter( item => operators[operator](item[field], operand) ),
        itemIdList = filtereditemCollection.map( item => item.id);

    return Promise.resolve(itemIdList);
}
export const getPrimaryKeyListMatchingRange = curry(_getPrimaryKeyListMatchingRange);


const _iterateOverBoxesInUniverse = (db: IDBDatabase, storeName: string, callBack: Function)=> {
    itemCollection[storeName].forEach(element => callback(element.id, element) );
    return Promise.resolve();
}
export const iterateOverBoxesInUniverse = curry(_iterateOverBoxesInUniverse);


const _getAllUniqueKeysForIndex = (db: IDBDatabase, storeName: string, indexName: string) => {
    const reducerToUniqueSetOfValues = (accumulator, currentElement) => {
        const 
            fieldValue = currentElement[indexName],
            mFieldValue = Array.isArray(fieldValue) ? fieldValue : [fieldValue];

        //for each elt in the array, we check if the value exist, if not we push it
        mFieldValue.forEach( singleValue => accumulator.indexOf(singleValue) === -1 && accumulator.push(singleValue) );
        
		return accumulator;
    }

    const sortFunction = comparator( (a, b) => a < b );
    const operandList = compose( sort( sortFunction), reduce(reducerToUniqueSetOfValues, []) )(itemCollection[storeName]);
    
	return Promise.resolve(operandList);
};
export const getAllUniqueKeysForIndex = curry(_getAllUniqueKeysForIndex);



const _getAllPrimaryKeysForindex = (db: IDBDatabase, storeName: string, indexName: string, reverseDirection: boolean) => {
    const reducerToSetOfValues = (accumulator, currentElement) => {
        accumulator.push(currentElement.id);   
		return accumulator;
    };
    
    const
        sorteditemCollection = sortBy(prop(indexName), itemCollection[storeName]),
        arrayOfSortedIds = sorteditemCollection.reduce(reducerToSetOfValues, []);

    return Promise.resolve(reverseDirection ? reverse(arrayOfSortedIds) : arrayOfSortedIds);
};
export const getAllPrimaryKeysForindex = curry(_getAllPrimaryKeysForindex);


const _getItemList = (db: IDBDatabase, storeName: string, idList: number[]): Promise<any> => {
    const itemList = [];

    idList.forEach( id => {
        const item = itemCollection[storeName].find( element => element.id === id)
        itemList.push(item);
    });

    return Promise.resolve(itemList);
};
export const getItemList = curry(_getItemList);



//!!!
const _getKeyRangeMatchingOperator = (operator: Operator, operand: FilterOperand) => (
    {
        operator,
        operand
    }
);
export const getKeyRangeMatchingOperator = curry(_getKeyRangeMatchingOperator);