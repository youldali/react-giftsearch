import filter, { getFilterGroup, addFilterFunctionToMap, evaluateSingleCriteria, makeFilterFunction, getFiltersFunctionsCollection, filterObjectWithFilterGroup, filterObjectWithIndependentFilters, filterObjectWithFilterCollection } from '../filteringListWithCriterias.js';

const gift1 = {'id': 1, 'name': 'Paris', 'price': 205, 'min_persons': 1,'max_persons': 1};
const gift2 = {'id': 2, 'name': 'Lyon', 'price': 350, 'min_persons': 2,'max_persons': 2};
const gift3 = {'id': 3, 'name': 'Barcelona', 'price': 700.5, 'min_persons': 2,'max_persons': 6};
const gift4 = {'id': 4, 'name': 'Lyon', 'price': 990, 'min_persons': 1,'max_persons': 1};
const gift5 = {'id': 5, 'name': 'Dublin', 'price': 55, 'min_persons': 2,'max_persons': 2};
const gift6 = {'id': 6, 'name': 'Lyon', 'price': 700, 'min_persons': 3,'max_persons': 7};

const giftCollection = [gift1, gift2, gift3, gift4, gift5, gift6];

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
		criterias: [{ 'field': 'fieldDoesNotExist', 'operator': '>', 'value': true }]
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

describe('getFiltersFunctionsCollection', () => {

	test('it should return the correct filter function for 1 filter (1)', () => {
		const target = gift1;
		const criterias = criteriasCollection['maxPrice']
		const filters = {maxPrice: 500};


		const filtersFunctionsCollection = getFiltersFunctionsCollection(filters, criteriasCollection);
		expect(filtersFunctionsCollection.has(undefined)).toBe(true);
		expect(filtersFunctionsCollection.get(undefined)[0]).toBeDefined();

		const filterMaxPriceFunction = filtersFunctionsCollection.get(undefined)[0];
		expect(filterMaxPriceFunction(gift1)).toBe(true);
		expect(filterMaxPriceFunction(gift6)).toBe(false);
	});

	test('it should return the correct filter function for 1 filter (1)', () => {
		const target = gift1;
		const criterias = criteriasCollection['maxPrice']
		const filters = {forPersonsSoloOnly: true};


		const filtersFunctionsCollection = getFiltersFunctionsCollection(filters, criteriasCollection);
		expect(filtersFunctionsCollection.has('person')).toBe(true);
		expect(filtersFunctionsCollection.get('person')[0]).toBeDefined();

		const filterForPersonSoloFunction = filtersFunctionsCollection.get('person')[0];
		expect(filterForPersonSoloFunction(gift1)).toBe(true);
		expect(filterForPersonSoloFunction(gift6)).toBe(false);
	});	

	test('it should return the corrects filter function for several filters', () => {
		const target = gift1;
		const criterias = criteriasCollection['maxPrice']
		const filters = {
			minPrice: 100, //no group
			maxPrice: 500, //no group
			forPersonsSoloOnly: true, //group 'person'
			forCouple: true, //group 'person'
			city: 'Lyon' //group 'location'
		};


		const filtersFunctionsCollection = getFiltersFunctionsCollection(filters, criteriasCollection);

		//no group
		expect(filtersFunctionsCollection.has(undefined)).toBe(true);
		expect(filtersFunctionsCollection.get(undefined)[0]).toBeDefined();
		expect(filtersFunctionsCollection.get(undefined)[1]).toBeDefined();		

		const filterForMinPriceFunction = filtersFunctionsCollection.get(undefined)[0];
		const filterForMaxPriceFunction = filtersFunctionsCollection.get(undefined)[1];

		expect(filterForMinPriceFunction(gift1)).toBe(true);
		expect(filterForMinPriceFunction(gift5)).toBe(false);

		expect(filterForMaxPriceFunction(gift2)).toBe(true);
		expect(filterForMaxPriceFunction(gift4)).toBe(false);		

		//group 'person'
		expect(filtersFunctionsCollection.has('person')).toBe(true);
		expect(filtersFunctionsCollection.get('person')[0]).toBeDefined();
		expect(filtersFunctionsCollection.get('person')[1]).toBeDefined();		

		const filterForPersonSoloFunction = filtersFunctionsCollection.get('person')[0];
		const filterForCoupleFunction = filtersFunctionsCollection.get('person')[1];

		expect(filterForPersonSoloFunction(gift1)).toBe(true);
		expect(filterForPersonSoloFunction(gift5)).toBe(false);

		expect(filterForCoupleFunction(gift2)).toBe(true);
		expect(filterForCoupleFunction(gift1)).toBe(false);

		//group 'location'
		expect(filtersFunctionsCollection.has('location')).toBe(true);
		expect(filtersFunctionsCollection.get('location')[0]).toBeDefined();
		expect(filtersFunctionsCollection.get('location')[1]).toBeUndefined();		

		const filterForCityFunction = filtersFunctionsCollection.get('location')[0];

		expect(filterForCityFunction(gift2)).toBe(true);
		expect(filterForCityFunction(gift1)).toBe(false);

	});				

});


describe('filterObjectWithFilterGroup', () => {

	test('Should return true when at least 1 function returns true', () => {
		const f1 = (target) => ( true );
		const f2 = (target) => ( false );
		const f3 = (target) => ( false );
		const filterGroupCollection = [f1, f2, f3];
		const result = filterObjectWithFilterGroup(filterGroupCollection, {});

		expect(result).toBe(true);

	});

	test('Should return false when all functions returns false', () => {
		const f1 = (target) => ( false );
		const f2 = (target) => ( false );
		const f3 = (target) => ( false );
		const filterGroupCollection = [f1, f2, f3];
		const result = filterObjectWithFilterGroup(filterGroupCollection, {});

		expect(result).toBe(false);		
	});			
			
});


describe('filterObjectWithIndependentFilters', () => {

	test('Should return true when all function are true', () => {
		const f1 = (target) => ( true );
		const f2 = (target) => ( true );
		const f3 = (target) => ( true );
		const filterGroupCollection = [f1, f2, f3];
		const result = filterObjectWithIndependentFilters(filterGroupCollection, {});

		expect(result).toBe(true);

	});

	test('Should return false at least 1 function returns false', () => {
		const f1 = (target) => ( true );
		const f2 = (target) => ( false );
		const f3 = (target) => ( true );
		const filterGroupCollection = [f1, f2, f3];
		const result = filterObjectWithIndependentFilters(filterGroupCollection, {});

		expect(result).toBe(false);		
	});			
			
});


describe('filterObjectWithFilterCollection', () => {

	test('Should return true all groups return true', () => {
		const f1G1 = (target) => ( true );
		const f2G1 = (target) => ( false );
		const f3G1 = (target) => ( true );
		const filterCollectionGroup1 = [f1G1, f2G1, f3G1];	

		const f1G2 = (target) => ( true );
		const f2G2 = (target) => ( false );
		const filterCollectionGroup2 = [f1G2, f2G2];

		const filterCollection = new Map()
			.set('group 1', filterCollectionGroup1)
			.set('group 2', filterCollectionGroup2);

		const result = filterObjectWithFilterCollection(filterCollection)({});
		expect(result).toBe(true);		
	});

	test('Should return true all groups return true and independent filters return true', () => {
		const f1G1 = (target) => ( true );
		const f2G1 = (target) => ( false );
		const f3G1 = (target) => ( true );
		const filterCollectionGroup1 = [f1G1, f2G1, f3G1];	

		const f1G2 = (target) => ( true );
		const f2G2 = (target) => ( false );
		const filterCollectionGroup2 = [f1G2, f2G2];

		const f1G3 = (target) => ( true );
		const f2G3 = (target) => ( true );
		const filterCollectionGroup3 = [f1G3, f2G3];		

		const filterCollection = new Map()
			.set('group 1', filterCollectionGroup1)
			.set('group 2', filterCollectionGroup2)
			.set(undefined, filterCollectionGroup3);

		const result = filterObjectWithFilterCollection(filterCollection)({});
		expect(result).toBe(true);		
	});

	test('Should return false when 1 group returns false', () => {
		const f1G1 = (target) => ( true );
		const f2G1 = (target) => ( false );
		const f3G1 = (target) => ( true );
		const filterCollectionGroup1 = [f1G1, f2G1, f3G1];	

		const f1G2 = (target) => ( false );
		const f2G2 = (target) => ( false );
		const filterCollectionGroup2 = [f1G2, f2G2];

		const filterCollection = new Map()
			.set('group 1', filterCollectionGroup1)
			.set('group 2', filterCollectionGroup2);

		const result = filterObjectWithFilterCollection(filterCollection)({});
		expect(result).toBe(false);			
	});		

	test('Should return false when 1 independent filter returns false', () => {
		const f1G1 = (target) => ( true );
		const f2G1 = (target) => ( true );
		const f3G1 = (target) => ( true );
		const filterCollectionGroup1 = [f1G1, f2G1, f3G1];	

		const f1G2 = (target) => ( true );
		const f2G2 = (target) => ( true );
		const filterCollectionGroup2 = [f1G2, f2G2];

		const f1G3 = (target) => ( true );
		const f2G3 = (target) => ( false );
		const filterCollectionGroup3 = [f1G3, f2G3];		

		const filterCollection = new Map()
			.set('group 1', filterCollectionGroup1)
			.set('group 2', filterCollectionGroup2)
			.set(undefined, filterCollectionGroup3);

		const result = filterObjectWithFilterCollection(filterCollection)({});
		expect(result).toBe(false);		
	});		
			
});

describe('filter', () => {

	test('it should only objects with price <= 300', () => {
		const filters = {'maxPrice': 300};
		const expectedCollection = [gift1, gift5];
		const filteredCollection = filter(giftCollection, filters, criteriasCollection);
		expect(filteredCollection).toEqual(expectedCollection);
	});

	test('it should return objects price <= 500', () => {
		const filters = {'maxPrice': 500};
		const expectedCollection = [gift1, gift2, gift5];
		const filteredCollection = filter(giftCollection, filters, criteriasCollection);
		expect(filteredCollection).toEqual(expectedCollection);
	});

	test('it should return objects for couples', () => {
		const filters = {'forCouple': true};
		const expectedCollection = [gift2, gift5];
		const filteredCollection = filter(giftCollection, filters, criteriasCollection);
		expect(filteredCollection).toEqual(expectedCollection);
	});		

	test('it should return objects for 4 persons', () => {
		const filters = {'forPersonsRange': 4};
		const expectedCollection = [gift3, gift6];
		const filteredCollection = filter(giftCollection, filters, criteriasCollection);
		expect(filteredCollection).toEqual(expectedCollection);
	});		

	test('it should return objects for solo OR couples', () => {
		const filters = {
			'forPersonsSoloOnly': true,
			'forCouple': true
		};
		const expectedCollection = [gift1, gift2, gift4, gift5];
		const filteredCollection = filter(giftCollection, filters, criteriasCollection);
		expect(filteredCollection).toEqual(expectedCollection);
	});	

	test('it should return objects for solo OR couples and Price between 200 and 400', () => {
		const filters = {
			'forPersonsSoloOnly': true,
			'forCouple': true,
			'minPrice': 200,
			'maxPrice': 400
		};
		const expectedCollection = [gift1, gift2];
		const filteredCollection = filter(giftCollection, filters, criteriasCollection);
		expect(filteredCollection).toEqual(expectedCollection);
	});

	test('it should return objects for solo OR couples and id in (1, 5)', () => {
		const filters = {
			'forPersonsSoloOnly': true,
			'forCouple': true,
			'id': [1, 5],
		};
		const expectedCollection = [gift1, gift5];
		const filteredCollection = filter(giftCollection, filters, criteriasCollection);
		expect(filteredCollection).toEqual(expectedCollection);
	});

	test('it should return objects for solo OR couples AND id in (1, 5) AND city is Paris', () => {
		const filters = {
			'forPersonsSoloOnly': true,
			'forCouple': true,
			'id': [1, 5],
			'city': 'Paris'
		};
		const expectedCollection = [gift1];
		const filteredCollection = filter(giftCollection, filters, criteriasCollection);
		expect(filteredCollection).toEqual(expectedCollection);
	});

	test('it should return objects in Paris Or Lyon', () => {
		const filters = {
			'cityLyon': true,
			'city': 'Paris'
		};
		const expectedCollection = [gift1, gift2, gift4, gift6];
		const filteredCollection = filter(giftCollection, filters, criteriasCollection);
		expect(filteredCollection).toEqual(expectedCollection);
	});	

	test('it should whole collection when no filter provided', () => {
		const filters = {};
		const expectedCollection = giftCollection;
		const filteredCollection = filter(giftCollection, filters, criteriasCollection);
		expect(filteredCollection).toEqual(expectedCollection);
	});		

	test('it should empty when field in not defined', () => {
		const filters = {'error': true};
		const expectedCollection = [];
		const filteredCollection = filter(giftCollection, filters, criteriasCollection);
		expect(filteredCollection).toEqual(expectedCollection);
	});			

});
