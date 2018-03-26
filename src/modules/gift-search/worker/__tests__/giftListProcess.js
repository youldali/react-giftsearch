import { getFilterItemsStatisticMap } from '../giftListProcess';
import * as storageHelper from '../../helpers/storage';
import { curry } from 'ramda';

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

const filtersCriteriasCollection = {
	priceRange1: { field: 'price', operator: 'inRangeOpenClosed', operand: [0, 50]},
	priceRange2: { field: 'price', operator: 'inRangeOpenClosed', operand: [50, 100]},
	priceRange3: { field: 'price', operator: 'inRangeOpenClosed', operand: [100, 200]},
 	priceRange4: { field: 'price', operator: '>', operand: 200} ,

	forOnePerson: { field: 'forOnePerson', operator: '===', operand: 1 },
	forCouple: { field: 'forCouple', operator: '===', operand: 1 },

	city: { field: 'name', operator: '===' },
	cityLyon: { field: 'name', operator: '===', operand: 'Lyon' },

	id: { field: 'id', operator: 'isIncluded'},
	excluWeb: { field: 'webExclusive', operator: '===', operand: 1 },
	experienceType: { field: 'experienceType', operator: 'hasOneInCommon' }
};

const filtersGroupsCollection = {
	forPersonsRange: 'person',
	forSoloOnly: 'person',
	forCouple: 'person',
	city: 'location',
	cityLyon: 'location',
	priceRange1: 'price',
	priceRange2: 'price',
	priceRange3: 'price',
	priceRange4: 'price',
};

const _iterateOverBoxesInUniverseMock = (db, universe, callback) => {
    giftCollection.forEach(element => {
        callback(element.id, element);
    });
    return Promise.resolve();
}
const iterateOverBoxesInUniverseMock = curry(_iterateOverBoxesInUniverseMock);
jest.spyOn(storageHelper, 'iterateOverBoxesInUniverse').mockImplementation(iterateOverBoxesInUniverseMock);

describe('_getFilterItemsStatisticMap', () => {
	test('Should return filter statistic structure matching the filters applied (1)', () => {

        const 
            filters = {priceRange1: true},
            universe = 'sejour',
            requestData = {filters, universe},
			db = {};

		const 
			result = getFilterItemsStatisticMap(db, requestData, filtersCriteriasCollection, filtersGroupsCollection),
			expected = new Map();
		expected
			.set(true, [1,2])
			.set(false, [])
			.set('price', [3,4,5,6,7,8,9,10]);

		return expect(result).resolves.toEqual(expected);
	});

	test('Should return filter statistic structure matching the filters applied (2)', () => {

        const 
            filters = {priceRange4: true, city: 'Lyon', experienceType: ['boat', 'plane']},
            universe = 'sejour',
            requestData = {filters, universe},
			db = {};

		const 
			result = getFilterItemsStatisticMap(db, requestData, filtersCriteriasCollection, filtersGroupsCollection),
			expected = new Map();
		expected
			.set(true, [6,7,8,10])
			.set(false, [1,2,3,5])
			.set('price', [4])
			.set('location', [9]);
			
		return expect(result).resolves.toEqual(expected);
	});
			
});