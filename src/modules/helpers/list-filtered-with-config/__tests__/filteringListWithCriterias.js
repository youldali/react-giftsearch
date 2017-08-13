import { getFilterGroup, addFilterFunctionToMap, evaluateSingleCriteria, makeFilterFunction } from '../filteringListWithCriterias.js';

import filter, * as filterBuilder from '../filterList';

const gift1 = {'id': 1, 'name': 'Paris', 'price': 205, 'min_persons': 1,'max_persons': 1};
const gift2 = {'id': 2, 'name': 'Lyon', 'price': 350, 'min_persons': 2,'max_persons': 2};
const gift3 = {'id': 3, 'name': 'Barcelona', 'price': 700.5, 'min_persons': 2,'max_persons': 6};
const gift4 = {'id': 4, 'name': 'Lyon', 'price': 990, 'min_persons': 1,'max_persons': 1};
const gift5 = {'id': 5, 'name': 'Dublin', 'price': 55, 'min_persons': 2,'max_persons': 2};
const gift6 = {'id': 6, 'name': 'Lyon', 'price': 700, 'min_persons': 3,'max_persons': 7};

const giftCollection = [gift1, gift2, gift3, gift4];

const criteriasCollection = {
	'maxPrice': {
		criterias: [{ 'field': 'price', 'operator': '<=' }] 
	},
	'minPrice': {
		criterias: [{ 'field': 'price', 'operator': '>=' }],
	},

	'forPersonsRange': {
		criterias: [{ 'field': 'min_persons', 'operator': '<=' }, { 'field': 'max_persons', 'operator': '>=' }],
		filterGroup: 'person'
	},
	'forPersonsSoloOnly': {
		criterias: [{ 'field': 'min_persons', 'operator': '===', 'value': 1 }, { 'field': 'max_persons', 'operator': '===', 'value': 1 }],
		filterGroup: 'person'
	},
	'forCouple': {
		criterias: [{ 'field': 'min_persons', 'operator': '===', 'value': 2 }, { 'field': 'max_persons', 'operator': '===', 'value': 2 }],
		filterGroup: 'person'
	},


	'error': {
		criterias: [{ 'field': 'fieldDoesNotExist', 'operator': '>' }]
	},

	'city': {
		criterias: [{ 'field': 'name', 'operator': '===' }],
		filterGroup: 'location'
	},
	'cityLyon': {
		criterias: [{ 'field': 'name', 'operator': '===', 'value': 'Lyon' }],
		filterGroup: 'location'
	},

	'id': {
		criterias: [{ 'field': 'id', 'operator': 'isIncluded'}],
	},
};

describe('getFilterGroup', () => {

	test('it should return the filter group of a particular filter (1)', () => {
		expect(getFilterGroup(criteriasCollection, 'city')).toBe('location');			
	});		

	test('it should return the filter group of a particular filter (2)', () => {
		expect(getFilterGroup(criteriasCollection, 'forCouple')).toBe('person');			
	});	

	test('it should return undefined when no filter Group is assigned', () => {
		expect(getFilterGroup(criteriasCollection, 'minPrice')).toBeUndefined();			
	});			

});

describe('addFilterFunctionToMap', () => {

	test('it should create the filter Group in the Map when it does not exist, and add the filter function', () => {
		const filtersFunctionsCollection = new Map();
		const filterFunction = () => {return 0;};
		addFilterFunctionToMap('groupe A', filterFunction, filtersFunctionsCollection);

		expect(filtersFunctionsCollection.has('groupe A')).toBe(true);
		expect(filtersFunctionsCollection.get('groupe A')[0]).toBe(filterFunction);
	});		

	test('it should add the filter function to the array if the group exist', () => {
		const filtersFunctionsCollection = new Map();
		const filterFunction1 = () => {return 0;};
		filtersFunctionsCollection.set('groupe A', [filterFunction1]);

		const filterFunction2 = () => {return 1;};
		addFilterFunctionToMap('groupe A', filterFunction2, filtersFunctionsCollection);

		expect(filtersFunctionsCollection.has('groupe A')).toBe(true);
		expect(filtersFunctionsCollection.get('groupe A')[0]).toBe(filterFunction1);
		expect(filtersFunctionsCollection.get('groupe A')[1]).toBe(filterFunction2);
	});		

	test('it should create the filter Group in the Map when it does not exist, and add the filter function (2)', () => {
		const filtersFunctionsCollection = new Map();
		const filterFunction = () => {return 0;};
		addFilterFunctionToMap(undefined, filterFunction, filtersFunctionsCollection);

		expect(filtersFunctionsCollection.has(undefined)).toBe(true);
		expect(filtersFunctionsCollection.get(undefined)[0]).toBe(filterFunction);
	});

});

describe('evaluateSingleCriteria', () => {

	test('it should return true when the criteria is fulfilled (1)', () => {
		const target = gift1;
		const criteria = criteriasCollection['maxPrice']['criterias'][0];
		const filterValueFallback = 500;

		const isCriteriaFulfilled = evaluateSingleCriteria(criteria, filterValueFallback, target);
		expect(isCriteriaFulfilled).toBe(true);
	});

	test('it should return false when the criteria is not fulfilled (1)', () => {
		const target = gift1;
		const criteria = criteriasCollection['maxPrice']['criterias'][0];
		const filterValueFallback = 100;

		const isCriteriaFulfilled = evaluateSingleCriteria(criteria, filterValueFallback, target);
		expect(isCriteriaFulfilled).toBe(false);
	});		


	test('it should return true when the criteria is fulfilled (2)', () => {
		const target = gift3;
		const criteria = criteriasCollection['forCouple']['criterias'][0];
		const filterValueFallback = undefined;

		const isCriteriaFulfilled = evaluateSingleCriteria(criteria, filterValueFallback, target);
		expect(isCriteriaFulfilled).toBe(true);
	});		

	test('it should return false when the criteria is not fulfilled (2)', () => {
		const target = gift3;
		const criteria = criteriasCollection['forCouple']['criterias'][1];
		const filterValueFallback = undefined;

		const isCriteriaFulfilled = evaluateSingleCriteria(criteria, filterValueFallback, target);
		expect(isCriteriaFulfilled).toBe(false);
	});		

	test('it should return true when the criteria is fulfilled (3)', () => {
		const target = gift3;
		const criteria = criteriasCollection['id']['criterias'][0];
		const filterValueFallback = [2, 3, 4];

		const isCriteriaFulfilled = evaluateSingleCriteria(criteria, filterValueFallback, target);
		expect(isCriteriaFulfilled).toBe(true);
	});		

	test('it should return false when the criteria is not fulfilled (3)', () => {
		const target = gift3;
		const criteria = criteriasCollection['id']['criterias'][0];
		const filterValueFallback = [2, 4];;

		const isCriteriaFulfilled = evaluateSingleCriteria(criteria, filterValueFallback, target);
		expect(isCriteriaFulfilled).toBe(false);
	});

	test('it should return false when the field does not exist in the target object', () => {
		const target = gift3;
		const criteria = criteriasCollection['error']['criterias'][0];
		const filterValueFallback = undefined;

		const isCriteriaFulfilled = evaluateSingleCriteria(criteria, filterValueFallback, target);
		expect(isCriteriaFulfilled).toBe(false);
	});		

});


describe('makeFilterFunction', () => {

	test('it should return true when the filter is fulfilled (1)', () => {
		const target = gift1;
		const criterias = criteriasCollection['maxPrice']['criterias'];
		const filterValueFallback = 500;

		const areCriteriasFulfilled = makeFilterFunction(filterValueFallback, criterias)(target);
		expect(areCriteriasFulfilled).toBe(true);
	});		

	test('it should return false when the filter is not fulfilled (1)', () => {
		const target = gift1;
		const criterias = criteriasCollection['maxPrice']['criterias'];
		const filterValueFallback = 150;

		const areCriteriasFulfilled = makeFilterFunction(filterValueFallback, criterias)(target);
		expect(areCriteriasFulfilled).toBe(false);
	});		

	test('it should return true when the filter is fulfilled (2)', () => {
		const target = gift2;
		const criterias = criteriasCollection['forCouple']['criterias'];
		const filterValueFallback = undefined;

		const areCriteriasFulfilled = makeFilterFunction(filterValueFallback, criterias)(target);
		expect(areCriteriasFulfilled).toBe(true);
	});		

	test('it should return false when the filter is not fulfilled (2)', () => {
		const target = gift1;
		const criterias = criteriasCollection['forCouple']['criterias'];
		const filterValueFallback = undefined;

		const areCriteriasFulfilled = makeFilterFunction(filterValueFallback, criterias)(target);
		expect(areCriteriasFulfilled).toBe(false);
	});

	test('it should return true when the filter is fulfilled (2)', () => {
		const target = gift6;
		const criterias = criteriasCollection['forPersonsRange']['criterias'];
		const filterValueFallback = 4;

		const areCriteriasFulfilled = makeFilterFunction(filterValueFallback, criterias)(target);
		expect(areCriteriasFulfilled).toBe(true);
	});		

	test('it should return false when the filter is not fulfilled (2)', () => {
		const target = gift5;
		const criterias = criteriasCollection['forPersonsRange']['criterias'];
		const filterValueFallback = 4;

		const areCriteriasFulfilled = makeFilterFunction(filterValueFallback, criterias)(target);
		expect(areCriteriasFulfilled).toBe(false);
	});
});
