import {evaluateCriteria, getFilterFunctionFromFilter, createFilterFunctionDataStructure, getFilteringDataFromFiltersTuples, getFilteringDataFromFilters } from '../filterFunctionBuilder';

const gift1 = {'id': 1, 'name': 'Paris', 'price': 25, forOnePerson: 1, forCouple: 0, experienceType: ['boat', 'car', 'parachute']};
const gift2 = {'id': 2, 'name': 'Lyon', 'price': 40, forOnePerson: 0, forCouple: 1, experienceType: ['car']};
const gift3 = {'id': 3, 'name': 'Barcelona', 'price': 120, forOnePerson: 1, forCouple: 0, experienceType: ['boat']};
const gift4 = {'id': 4, 'name': 'Lyon', 'price': 199, forOnePerson: 1, forCouple: 0, experienceType: ['boat', 'plane']};
const gift5 = {'id': 5, 'name': 'Dublin', 'price': 301, forOnePerson: 1, forCouple: 1, experienceType: ['parachute']};
const gift6 = {'id': 6, 'name': 'Lyon', 'price': 700, forOnePerson: 0, forCouple: 1, experienceType: ['boat', 'car']};

const giftCollection = [gift1, gift2, gift3, gift4, gift5, gift6];

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
};

describe('evaluateCriteria', () => {
	test('it should return true when the criteria is fulfilled (1)', () => {
		const target = gift1;
		const criteria = filtersCriteriasCollection['priceRange1'];

		const isCriteriaFulfilled = evaluateCriteria(criteria, true)(target);
		expect(isCriteriaFulfilled).toBe(true);
	});

	test('it should return false when the criteria is not fulfilled (1)', () => {
		const target = gift1;
		const criteria = filtersCriteriasCollection['priceRange4'];

		const isCriteriaFulfilled = evaluateCriteria(criteria, true)(target);
		expect(isCriteriaFulfilled).toBe(false);
	});		


	test('it should return true when the criteria is fulfilled (2)', () => {
		const target = gift5;
		const criteria = filtersCriteriasCollection['forCouple'];

		const isCriteriaFulfilled = evaluateCriteria(criteria, true)(target);
		expect(isCriteriaFulfilled).toBe(true);
	});		

	test('it should return false when the criteria is not fulfilled (2)', () => {
		const target = gift4;
		const criteria = filtersCriteriasCollection['forCouple'];

		const isCriteriaFulfilled = evaluateCriteria(criteria, true)(target);
		expect(isCriteriaFulfilled).toBe(false);
	});		

	test('it should return true when the criteria is fulfilled (3)', () => {
		const target = gift3;
		const criteria = filtersCriteriasCollection['id'];
		const filterValueFallback = [2, 3, 4];
		
		const isCriteriaFulfilled = evaluateCriteria(criteria, filterValueFallback)(target);
		expect(isCriteriaFulfilled).toBe(true);
	});		

	test('it should return false when the criteria is not fulfilled (3)', () => {
		const target = gift3;
		const criteria = filtersCriteriasCollection['id'];
		const filterValueFallback = [2, 4];

		const isCriteriaFulfilled = evaluateCriteria(criteria, filterValueFallback)(target);
		expect(isCriteriaFulfilled).toBe(false);
	});	

	test('it should return true when the criteria is fulfilled (4)', () => {
		const target = gift1;
		const criteria = filtersCriteriasCollection['experienceType'];
		const filterValueFallback = ['car', 'cycling', 'gaming'];
		
		const isCriteriaFulfilled = evaluateCriteria(criteria, filterValueFallback)(target);
		expect(isCriteriaFulfilled).toBe(true);
	});

	test('it should return false when the criteria is not fulfilled (4)', () => {
		const target = gift1;
		const criteria = filtersCriteriasCollection['experienceType'];
		const filterValueFallback = ['cycling', 'gaming', 'shooting'];
		
		const isCriteriaFulfilled = evaluateCriteria(criteria, filterValueFallback)(target);
		expect(isCriteriaFulfilled).toBe(false);
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
	test('it should return an object with correctly sorted filterFunctionListByGroup (group with less function first), and the corresponding Map filterFunctionListMappedToFilterGroup', () => {
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

		const {filterFunctionListByGroup, filterFunctionListMappedToFilterGroup} = filterFunctionStructure.getFilteringData();
		expect(filterFunctionListByGroup.length).toBe(5);

		const group0 = filterFunctionListByGroup[0];
		expect(group0.length).toBe(1);
		expect(group0[0]).toBe(filterFunctionObject.minPrice);
		expect(filterFunctionListMappedToFilterGroup.get(group0)).toBeUndefined();

		const group1 = filterFunctionListByGroup[1];
		expect(group1.length).toBe(1);
		expect(group1[0]).toBe(filterFunctionObject.maxPrice);
		expect(filterFunctionListMappedToFilterGroup.get(group1)).toBeUndefined();

		const group2 = filterFunctionListByGroup[2];
		expect(group2.length).toBe(1);
		expect(group2[0]).toBe(filterFunctionObject.id);
		expect(filterFunctionListMappedToFilterGroup.get(group2)).toBeUndefined();

		const group3 = filterFunctionListByGroup[3];
		expect(group3.length).toBe(1);
		expect(group3[0]).toBe(filterFunctionObject.cityLyon);
		expect(filterFunctionListMappedToFilterGroup.get(group3)).toBe('location');

		const group4 = filterFunctionListByGroup[4];
		expect(group4.length).toBe(2);
		expect(group4[0]).toBe(filterFunctionObject.forCouple);
		expect(group4[1]).toBe(filterFunctionObject.forSoloOnly);
		expect(filterFunctionListMappedToFilterGroup.get(group4)).toBe('person');

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

		const {filterFunctionListByGroup, filterFunctionListMappedToFilterGroup} = getFilteringDataFromFiltersTuples(filtersGroupsCollection)(filtersTuples);
		expect(filterFunctionListByGroup.length).toBe(3);

		const group0 = filterFunctionListByGroup[0];
		expect(group0.length).toBe(1);
		expect(group0[0]).toBe(filterFunctionObject.minPrice);
		expect(filterFunctionListMappedToFilterGroup.get(group0)).toBeUndefined();

		const group1 = filterFunctionListByGroup[1];
		expect(group1.length).toBe(1);
		expect(group1[0]).toBe(filterFunctionObject.cityLyon);
		expect(filterFunctionListMappedToFilterGroup.get(group1)).toBe('location');

		const group2 = filterFunctionListByGroup[2];
		expect(group2.length).toBe(2);
		expect(group2[0]).toBe(filterFunctionObject.forCouple);
		expect(group2[1]).toBe(filterFunctionObject.forSoloOnly);
		expect(filterFunctionListMappedToFilterGroup.get(group2)).toBe('person');

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

		const {filterFunctionListByGroup, filterFunctionListMappedToFilterGroup} = partiallyAppliedGetFilteringData(filters);
		expect(filterFunctionListByGroup.length).toBe(3);
		
		const group0 = filterFunctionListByGroup[0];
		expect(group0.length).toBe(1);
		expect(filterFunctionListMappedToFilterGroup.get(group0)).toBeUndefined();

		const group1 = filterFunctionListByGroup[1];
		expect(group1.length).toBe(1);
		expect(filterFunctionListMappedToFilterGroup.get(group1)).toBeUndefined();

		const group2 = filterFunctionListByGroup[2];
		expect(group2.length).toBe(2);
		expect(filterFunctionListMappedToFilterGroup.get(group2)).toBe('person');
	});		
});
