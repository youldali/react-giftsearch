import { curry, reverse, sort } from 'ramda';

const idbStorage = jest.genMockFromModule('../idbStorage');


const gift1 = {'id': 1, 'name': 'Paris', 'price': 25, forOnePerson: 1, forCouple: 0, experienceType: ['boat', 'car', 'parachute']};
const gift2 = {'id': 2, 'name': 'Lyon', 'price': 40, forOnePerson: 0, forCouple: 1, experienceType: ['car']};
const gift3 = {'id': 3, 'name': 'Barcelona', 'price': 120, forOnePerson: 1, forCouple: 0, experienceType: ['boat']};
const gift4 = {'id': 4, 'name': 'Lyon', 'price': 199, forOnePerson: 1, forCouple: 0, experienceType: ['boat', 'plane']};
const gift5 = {'id': 5, 'name': 'Dublin', 'price': 301, forOnePerson: 1, forCouple: 1, experienceType: ['parachute']};
const gift6 = {'id': 6, 'name': 'Lyon', 'price': 600, forOnePerson: 0, forCouple: 1, experienceType: ['boat', 'car']};
const gift7 = {'id': 7, 'name': 'Lyon', 'price': 700, forOnePerson: 0, forCouple: 1, experienceType: ['boat', 'car', 'plane']};
const gift8 = {'id': 8, 'name': 'Lyon', 'price': 800, forOnePerson: 0, forCouple: 1, experienceType: ['boat', 'car']};
const gift9 = {'id': 9, 'name': 'Paris', 'price': 900, forOnePerson: 0, forCouple: 1, experienceType: ['plane']};
const gift10 = {'id':10, 'name': 'Lyon', 'price': 1000, forOnePerson: 0, forCouple: 1, experienceType: ['boat', 'plane']};

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
        sortedGiftCollection = sort( (a, b) => a.price - b.price),
        arrayOfSortedIds = sortedGiftCollection.reduce(reducerToUniqueSetOfValues, []);

    return Promise.resolve(reverseDirection ? reverse(arrayOfSortedIds) : arrayOfSortedIds);
};
export const getAllPrimaryKeysForindex = curry(_getAllPrimaryKeysForindex);
