import { curry, reverse, sortBy, prop } from 'ramda';
import operators from '../operators';

const idbStorage = jest.genMockFromModule('../idbStorage');


const gift1 = {'id': 1, name: 'stay in Paris', 'city': 'Paris', 'price': 25, forOnePerson: 1, forCouple: 0, experienceType: ['boat', 'car', 'parachute']};
const gift2 = {'id': 2, name: 'stay in Lyon', 'city': 'Lyon', 'price': 40, forOnePerson: 0, forCouple: 1, experienceType: ['car']};
const gift3 = {'id': 3, name: 'stay in barcelona', 'city': 'Barcelona', 'price': 120, forOnePerson: 1, forCouple: 0, experienceType: ['boat']};
const gift4 = {'id': 4, name: 'eat in Lyon', 'city': 'Lyon', 'price': 199, forOnePerson: 1, forCouple: 0, experienceType: ['boat', 'plane']};
const gift5 = {'id': 5, name: 'stay in Dublin', 'city': 'Dublin', 'price': 301, forOnePerson: 1, forCouple: 1, experienceType: ['parachute']};
const gift6 = {'id': 6, name: 'cycle in Lyon', 'city': 'Lyon', 'price': 600, forOnePerson: 0, forCouple: 1, experienceType: ['boat', 'car']};
const gift7 = {'id': 7, name: 'stay in Lyon 2', 'city': 'Lyon', 'price': 700, forOnePerson: 0, forCouple: 1, experienceType: ['boat', 'car', 'plane']};
const gift8 = {'id': 8, name: 'stay in Lyon 3', 'city': 'Lyon', 'price': 800, forOnePerson: 0, forCouple: 1, experienceType: ['boat', 'car']};
const gift9 = {'id': 9, name: 'eat in Paris', 'city': 'Paris', 'price': 900, forOnePerson: 0, forCouple: 1, experienceType: ['plane']};
const gift10 = {'id':10, name: 'stay in Berlin', 'city': 'Berlin', 'price': 1000, forOnePerson: 0, forCouple: 1, experienceType: ['boat', 'plane']};

export
const giftCollection = [gift1, gift2, gift3, gift4, gift5, gift6, gift7, gift8, gift9, gift10];


const _iterateOverBoxesInUniverse = (db, universe, callback) => {
    giftCollection.forEach(element => {
        callback(element.id, element);
    });
    return Promise.resolve();
}
export const iterateOverBoxesInUniverse = curry(_iterateOverBoxesInUniverse);


const _getAllUniqueKeysForIndex = (db: IDBDatabase, universe: string, field: string) => {
    const reducerToUniqueSetOfValues = (accumulator, currentElement) => {
        const 
            fieldValue = currentElement[field],
            mFieldValue = Array.isArray(fieldValue) ? fieldValue : [fieldValue];

        //for each elt in the array, we check if the value exist, if not we push it
        mFieldValue.forEach( singleValue => {
            accumulator.indexOf(singleValue) === -1 && accumulator.push(singleValue);
        });
        
		return accumulator;
	}
	return Promise.resolve(giftCollection.reduce(reducerToUniqueSetOfValues, []) );
};
export const getAllUniqueKeysForIndex = curry(_getAllUniqueKeysForIndex);



const _getAllPrimaryKeysForindex = (db: IDBDatabase, universe: string, field: string, reverseDirection: boolean) => {
    const reducerToSetOfValues = (accumulator, currentElement) => {
        accumulator.push(currentElement.id);   
		return accumulator;
    };
    
    const
        sortedGiftCollection = sortBy(prop(field), giftCollection),
        arrayOfSortedIds = sortedGiftCollection.reduce(reducerToSetOfValues, []);

    return Promise.resolve(reverseDirection ? reverse(arrayOfSortedIds) : arrayOfSortedIds);
};
export const getAllPrimaryKeysForindex = curry(_getAllPrimaryKeysForindex);


const _getItemList = (db: IDBDatabase, universe: string, idList: number[]): Promise<any> => {
    const itemList = [];

    idList.forEach( id => {
        const item = giftCollection.find( element => element.id === id)
        itemList.push(item);
    });

    return Promise.resolve(itemList);
};
export const getItemList = curry(_getItemList);


const _getPrimaryKeyListMatchingRange = (db: IDBDatabase, storeName: string, indexName: string, keyRange: IDBKeyRange) => {
    const 
        { operator, operand } = keyRange,
        field = indexName;

    const 
        multiOperator = ['isIncluded', 'hasOneInCommon'],
        mOperand = multiOperator.includes(operator) ? [operand] : operand;

    const 
        filteredGiftCollection = giftCollection.filter( item => operators[operator](item[field], mOperand) ),
        itemIdList = filteredGiftCollection.map( item => item.id);

    return Promise.resolve(itemIdList);
}
export const getPrimaryKeyListMatchingRange = curry(_getPrimaryKeyListMatchingRange);


const _getKeyRangeMatchingOperator = (operator: Operator, operand: FilterOperand) => (
    {
        operator,
        operand
    }
);
export const getKeyRangeMatchingOperator = curry(_getKeyRangeMatchingOperator);