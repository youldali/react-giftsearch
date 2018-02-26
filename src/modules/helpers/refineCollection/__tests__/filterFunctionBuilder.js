import {evaluateSingleCriteria, evaluateCriteriaList, getFilterFunctionFromFilter, createFilterFunctionDataStructure, getFilteringDataFromFiltersTuples, getFilteringDataFromFilters } from '../filterFunctionBuilder';

const gift1 = {'id': 1, 'name': 'Paris', 'price': 205, 'min_persons': 1,'max_persons': 1};
const gift2 = {'id': 2, 'name': 'Lyon', 'price': 350, 'min_persons': 2,'max_persons': 2};
const gift3 = {'id': 3, 'name': 'Barcelona', 'price': 700.5, 'min_persons': 2,'max_persons': 6};
const gift4 = {'id': 4, 'name': 'Lyon', 'price': 990, 'min_persons': 1,'max_persons': 1};
const gift5 = {'id': 5, 'name': 'Dublin', 'price': 55, 'min_persons': 2,'max_persons': 2};
const gift6 = {'id': 6, 'name': 'Lyon', 'price': 700, 'min_persons': 3,'max_persons': 7};

const giftCollection = [gift1, gift2, gift3, gift4, gift5, gift6];

const filtersCriteriasCollection = {
	'maxPrice': [{ 'field': 'price', 'operator': '<=' }],
	'minPrice': [{ 'field': 'price', 'operator': '>=' }],

	'forPersonsRange': [{ 'field': 'min_persons', 'operator': '<=' }, { 'field': 'max_persons', 'operator': '>=' }],
	'forSoloOnly': [{ 'field': 'min_persons', 'operator': '===', 'value': 1 }, { 'field': 'max_persons', 'operator': '===', 'value': 1 }],
	'forCouple': [{ 'field': 'min_persons', 'operator': '===', 'value': 2 }, { 'field': 'max_persons', 'operator': '===', 'value': 2 }],

	'city': [{ 'field': 'name', 'operator': '===' }],
	'cityLyon': [{ 'field': 'name', 'operator': '===', 'value': 'Lyon' }],

	'id': [{ 'field': 'id', 'operator': 'isIncluded'}],
};

const filtersGroupsCollection = {
	forPersonsRange: 'person',
	forSoloOnly: 'person',
	forCouple: 'person',
	city: 'location',
	cityLyon: 'location',
};

describe('evaluateSingleCriteria', () => {
	test('it should return true when the criteria is fulfilled (1)', () => {
		const target = gift1;
		const criteria = filtersCriteriasCollection['maxPrice'][0];
		const filterValueFallback = 500;

		const isCriteriaFulfilled = evaluateSingleCriteria(criteria, filterValueFallback)(target);
		expect(isCriteriaFulfilled).toBe(true);
	});

	test('it should return false when the criteria is not fulfilled (1)', () => {
		const target = gift1;
		const criteria = filtersCriteriasCollection['maxPrice'][0];
		const filterValueFallback = 100;

		const isCriteriaFulfilled = evaluateSingleCriteria(criteria, filterValueFallback)(target);
		expect(isCriteriaFulfilled).toBe(false);
	});		


	test('it should return true when the criteria is fulfilled (2)', () => {
		const target = gift3;
		const criteria = filtersCriteriasCollection['forCouple'][0];
		const filterValueFallback = undefined;

		const isCriteriaFulfilled = evaluateSingleCriteria(criteria, filterValueFallback)(target);
		expect(isCriteriaFulfilled).toBe(true);
	});		

	test('it should return false when the criteria is not fulfilled (2)', () => {
		const target = gift3;
		const criteria = filtersCriteriasCollection['forCouple'][1];
		const filterValueFallback = undefined;

		const isCriteriaFulfilled = evaluateSingleCriteria(criteria, filterValueFallback)(target);
		expect(isCriteriaFulfilled).toBe(false);
	});		

	test('it should return true when the criteria is fulfilled (3)', () => {
		const target = gift3;
		const criteria = filtersCriteriasCollection['id'][0];
		const filterValueFallback = [2, 3, 4];

		const isCriteriaFulfilled = evaluateSingleCriteria(criteria, filterValueFallback)(target);
		expect(isCriteriaFulfilled).toBe(true);
	});		

	test('it should return false when the criteria is not fulfilled (3)', () => {
		const target = gift3;
		const criteria = filtersCriteriasCollection['id'][0];
		const filterValueFallback = [2, 4];;

		const isCriteriaFulfilled = evaluateSingleCriteria(criteria, filterValueFallback)(target);
		expect(isCriteriaFulfilled).toBe(false);
	});	
});


describe('evaluateCriteriaList', () => {
	test('it should return true when the filter is fulfilled (1)', () => {
		const target = gift1;
		const criterias = filtersCriteriasCollection['maxPrice'];
		const filterValueFallback = 500;

		const areCriteriasFulfilled = evaluateCriteriaList(filterValueFallback, criterias)(target);
		expect(areCriteriasFulfilled).toBe(true);
	});		

	test('it should return false when the filter is not fulfilled (1)', () => {
		const target = gift1;
		const criterias = filtersCriteriasCollection['maxPrice'];
		const filterValueFallback = 150;

		const areCriteriasFulfilled = evaluateCriteriaList(filterValueFallback, criterias)(target);
		expect(areCriteriasFulfilled).toBe(false);
	});		

	test('it should return true when the filter is fulfilled (2)', () => {
		const target = gift2;
		const criterias = filtersCriteriasCollection['forCouple'];
		const filterValueFallback = undefined;

		const areCriteriasFulfilled = evaluateCriteriaList(filterValueFallback, criterias)(target);
		expect(areCriteriasFulfilled).toBe(true);
	});		

	test('it should return false when the filter is not fulfilled (2)', () => {
		const target = gift1;
		const criterias = filtersCriteriasCollection['forCouple'];
		const filterValueFallback = undefined;

		const areCriteriasFulfilled = evaluateCriteriaList(filterValueFallback, criterias)(target);
		expect(areCriteriasFulfilled).toBe(false);
	});

	test('it should return true when the filter is fulfilled (2)', () => {
		const target = gift6;
		const criterias = filtersCriteriasCollection['forPersonsRange'];
		const filterValueFallback = 4;

		const areCriteriasFulfilled = evaluateCriteriaList(filterValueFallback, criterias)(target);
		expect(areCriteriasFulfilled).toBe(true);
	});		

	test('it should return false when the filter is not fulfilled (2)', () => {
		const target = gift5;
		const criterias = filtersCriteriasCollection['forPersonsRange'];
		const filterValueFallback = 4;

		const areCriteriasFulfilled = evaluateCriteriaList(filterValueFallback, criterias)(target);
		expect(areCriteriasFulfilled).toBe(false);
	});
});


describe('getFilterFunctionFromFilter', () => {
	test('it should return a function', () => {
		const filterName = 'forCouple'
		const filterFunction = getFilterFunctionFromFilter(filtersCriteriasCollection)(true, filterName);
		expect(typeof filterFunction).toBe('function');

		const isGift1ForCouple = filterFunction(gift1);
		const isGift2ForCouple = filterFunction(gift2);
		expect(isGift1ForCouple).toBe(false);
		expect(isGift2ForCouple).toBe(true);
	});		
});

describe('createFilterFunctionDataStructure', () => {
	test('it should return an object with correctly sorted filterFunctionListByGroup (group with less function first), and the corresponding Map filterFunctionListMapped', () => {
		const appliedGetFilterFunctionFromFilter = getFilterFunctionFromFilter(filtersCriteriasCollection);
		const filterFunctionObject = {
			minPrice: appliedGetFilterFunctionFromFilter(50, 'minPrice'),
			forCouple: appliedGetFilterFunctionFromFilter(true, 'forCouple'),
			cityLyon: appliedGetFilterFunctionFromFilter(true, 'cityLyon'),
			maxPrice: appliedGetFilterFunctionFromFilter(100, 'cityLyon'),
			forSoloOnly: appliedGetFilterFunctionFromFilter(true, 'forSoloOnly'),
			id: appliedGetFilterFunctionFromFilter([1,2], 'id'),
		};

		const filterFunctionStructure = createFilterFunctionDataStructure();
		filterFunctionStructure.addFilterFunction(filterFunctionObject.minPrice);
		filterFunctionStructure.addFilterFunction(filterFunctionObject.forCouple, 'person');
		filterFunctionStructure.addFilterFunction(filterFunctionObject.cityLyon, 'location');
		filterFunctionStructure.addFilterFunction(filterFunctionObject.maxPrice);
		filterFunctionStructure.addFilterFunction(filterFunctionObject.forSoloOnly, 'person');
		filterFunctionStructure.addFilterFunction(filterFunctionObject.id);

		const {filterFunctionListByGroup, filterFunctionListMapped} = filterFunctionStructure.getFilteringData();
		expect(filterFunctionListByGroup.length).toBe(5);

		const group0 = filterFunctionListByGroup[0];
		expect(group0.length).toBe(1);
		expect(group0[0]).toBe(filterFunctionObject.minPrice);
		expect(filterFunctionListMapped.get(group0)).toBeUndefined();

		const group1 = filterFunctionListByGroup[1];
		expect(group1.length).toBe(1);
		expect(group1[0]).toBe(filterFunctionObject.maxPrice);
		expect(filterFunctionListMapped.get(group1)).toBeUndefined();

		const group2 = filterFunctionListByGroup[2];
		expect(group2.length).toBe(1);
		expect(group2[0]).toBe(filterFunctionObject.id);
		expect(filterFunctionListMapped.get(group2)).toBeUndefined();

		const group3 = filterFunctionListByGroup[3];
		expect(group3.length).toBe(1);
		expect(group3[0]).toBe(filterFunctionObject.cityLyon);
		expect(filterFunctionListMapped.get(group3)).toBe('location');

		const group4 = filterFunctionListByGroup[4];
		expect(group4.length).toBe(2);
		expect(group4[0]).toBe(filterFunctionObject.forCouple);
		expect(group4[1]).toBe(filterFunctionObject.forSoloOnly);
		expect(filterFunctionListMapped.get(group4)).toBe('person');

	});		
});


describe('getFilteringDataFromFiltersTuples', () => {
	test('it should return get the correct FilterData', () => {
		const appliedGetFilterFunctionFromFilter = getFilterFunctionFromFilter(filtersCriteriasCollection);
		const filterFunctionObject = {
			forCouple: appliedGetFilterFunctionFromFilter(true, 'forCouple'),
			forSoloOnly: appliedGetFilterFunctionFromFilter(true, 'forSoloOnly'),
			cityLyon: appliedGetFilterFunctionFromFilter(true, 'cityLyon'),
			minPrice: appliedGetFilterFunctionFromFilter(50, 'minPrice'),
		};

		const filtersTuples = [
			['forCouple', filterFunctionObject.forCouple],
			['forSoloOnly', filterFunctionObject.forSoloOnly],
			['cityLyon', filterFunctionObject.cityLyon],
			['minPrice', filterFunctionObject.minPrice],
		];

		const {filterFunctionListByGroup, filterFunctionListMapped} = getFilteringDataFromFiltersTuples(filtersGroupsCollection)(filtersTuples);
		expect(filterFunctionListByGroup.length).toBe(3);

		const group0 = filterFunctionListByGroup[0];
		expect(group0.length).toBe(1);
		expect(group0[0]).toBe(filterFunctionObject.minPrice);
		expect(filterFunctionListMapped.get(group0)).toBeUndefined();

		const group1 = filterFunctionListByGroup[1];
		expect(group1.length).toBe(1);
		expect(group1[0]).toBe(filterFunctionObject.cityLyon);
		expect(filterFunctionListMapped.get(group1)).toBe('location');

		const group2 = filterFunctionListByGroup[2];
		expect(group2.length).toBe(2);
		expect(group2[0]).toBe(filterFunctionObject.forCouple);
		expect(group2[1]).toBe(filterFunctionObject.forSoloOnly);
		expect(filterFunctionListMapped.get(group2)).toBe('person');

	});	
});

describe('getFilteringDataFromFilters', () => {
	test('it should get the correct FilterData', () => {
		const partiallyAppliedGetFilteringData = getFilteringDataFromFilters(filtersCriteriasCollection, filtersGroupsCollection);
		const filters = {
							maxPrice: 500,
							minPrice: 100,
							forCouple: true,
							forSoloOnly: true,
						};

		const {filterFunctionListByGroup, filterFunctionListMapped} = partiallyAppliedGetFilteringData(filters);
		expect(filterFunctionListByGroup.length).toBe(3);
		
		const group0 = filterFunctionListByGroup[0];
		expect(group0.length).toBe(1);
		expect(filterFunctionListMapped.get(group0)).toBeUndefined();

		const group1 = filterFunctionListByGroup[1];
		expect(group1.length).toBe(1);
		expect(filterFunctionListMapped.get(group1)).toBeUndefined();

		const group2 = filterFunctionListByGroup[2];
		expect(group2.length).toBe(2);
		expect(filterFunctionListMapped.get(group2)).toBe('person');
	});		
});
