import filter, * as filterBuilder from '../filterBuilder';

const gift1 = {'name': 'Paris', 'price': 205, 'min_persons': 1,'max_persons': 1};
const gift2 = {'name': 'Lyon', 'price': 350, 'min_persons': 1,'max_persons': 2};
const gift3 = {'name': 'Barcelona', 'price': 700.5, 'min_persons': 2,'max_persons': 6};
const gift4 = {'name': 'Lyon', 'price': 990, 'min_persons': 1,'max_persons': 1};
const giftCollection = [gift1, gift2, gift3, gift4];

const criteriasCollection = {
	'maxPrice': [{ 'field': 'price', 'operator': '<=' }],
	'forPersons': [{ 'field': 'min_persons', 'operator': '<=' }, { 'field': 'max_persons', 'operator': '>=' }],
	'complex': [{ 'field': 'complex1', 'operator': '>' }, { 'field': 'complex2', 'operator': '<=' }, { 'field': 'complex3', 'operator': '===' }, { 'field': 'complex4', 'operator': '!=' }],
	'city': [{ 'field': 'name', 'operator': '===' }]
};

describe('buildFilterSubQuery', () => {

	test('it should return query with 1 test', () => {
		const filters = {'maxPrice': 500};
		const query = filterBuilder.buildFilterSubQuery(filters['maxPrice'], criteriasCollection['maxPrice'], 'gift1'); 
		const expectedQuery = "&& gift1['price'] <= 500 ";
		expect(query).toBe(expectedQuery);			
	});

	test('it should return query with 2 tests', () => {
		const filters = {'forPersons': 2};
		const query = filterBuilder.buildFilterSubQuery(filters['forPersons'], criteriasCollection['forPersons'], 'gift1'); 
		const expectedQuery = "&& gift1['min_persons'] <= 2 && gift1['max_persons'] >= 2 ";
		expect(query).toBe(expectedQuery);			
	});

	test('it should return query with multiple tests', () => {
		const filters = {'complex': 10.57};
		const query = filterBuilder.buildFilterSubQuery(filters['complex'], criteriasCollection['complex'], 'gift1'); 
		const expectedQuery = "&& gift1['complex1'] > 10.57 && gift1['complex2'] <= 10.57 && gift1['complex3'] === 10.57 && gift1['complex4'] != 10.57 ";
		expect(query).toBe(expectedQuery);			
	});			

	test('it should return query with test for string value', () => {
		const filters = {'city': "Lyon"};
		const query = filterBuilder.buildFilterSubQuery(filters['city'], criteriasCollection['city'], 'gift1'); 
		const expectedQuery = "&& gift1['name'] === \"Lyon\" ";
		expect(query).toBe(expectedQuery);			
	});	

});

describe('buildFilterQuery', () => {

	test('it should return full query for 1 filter', () => {
		const filters = {'maxPrice': 500};
		const query = filterBuilder.buildFilterQuery(filters, criteriasCollection, 'gift1')
		const expectedQuery = "true && gift1['price'] <= 500 ";
		expect(query).toBe(expectedQuery);
	});

	test('it should return full query for 1 complex filter', () => {
		const filters = {'forPersons': 3};
		const query = filterBuilder.buildFilterQuery(filters, criteriasCollection, 'gift1')
		const expectedQuery = "true && gift1['min_persons'] <= 3 && gift1['max_persons'] >= 3 ";
		expect(query).toBe(expectedQuery);
	});

	test('it should return full query for multiple filters', () => {
		const filters = {'forPersons': 3, 'maxPrice': 500};
		const query = filterBuilder.buildFilterQuery(filters, criteriasCollection, 'gift1')
		const expectedQuery = "true && gift1['min_persons'] <= 3 && gift1['max_persons'] >= 3 && gift1['price'] <= 500 ";
		expect(query).toBe(expectedQuery);
	});

	test('it should return full query for multiple complex filters', () => {
		const filters = {'forPersons': 3, 'maxPrice': 500, 'complex': 11.1, 'city': 'Dublin'};
		const query = filterBuilder.buildFilterQuery(filters, criteriasCollection, 'gift1')
		const expectedQuery = "true && gift1['min_persons'] <= 3 && gift1['max_persons'] >= 3 && gift1['price'] <= 500 && gift1['complex1'] > 11.1 && gift1['complex2'] <= 11.1 && gift1['complex3'] === 11.1 && gift1['complex4'] != 11.1 && gift1['name'] === \"Dublin\" ";
		expect(query).toBe(expectedQuery);
	});	

	test('it should return empty query when filter is not defined in the filterConfig', () => {
		const filters = {'undefinedFilter': 500};
		const query = filterBuilder.buildFilterQuery(filters, criteriasCollection, 'gift1')
		const expectedQuery = "true ";
		expect(query).toBe(expectedQuery);
	});	

});


describe('filterObjectAgainstCriterias', () => {

	test('it should return true if price <= 300', () => {
		const filters = {'maxPrice': 300};
		const result = filterBuilder.filterObjectAgainstCriterias(filters, criteriasCollection)(gift1);
		expect(result).toBe(true);
	});

	test('it should return false if price > 300', () => {
		const filters = {'maxPrice': 300};
		const result = filterBuilder.filterObjectAgainstCriterias(filters, criteriasCollection)(gift3);
		expect(result).toBe(false);
	});	

	test('it should return true if suitable for 2 persons <= 300', () => {
		const filters = {'forPersons': 2, 'maxPrice': 400};
		const result = filterBuilder.filterObjectAgainstCriterias(filters, criteriasCollection)(gift2);
		expect(result).toBe(true);
	});

	test('it should return false if not suitable for 2 persons', () => {
		const filters = {'forPersons': 2, 'maxPrice': 400};
		const result = filterBuilder.filterObjectAgainstCriterias(filters, criteriasCollection)(gift1);
		expect(result).toBe(false);

		const result2 = filterBuilder.filterObjectAgainstCriterias(filters, criteriasCollection)(gift3);
		expect(result2).toBe(false);		
	});	

});

describe('filter', () => {

	test('it should only objects with price <= 300', () => {
		const filters = {'maxPrice': 300};
		const expectedCollection = [gift1];
		const filteredCollection = filter(giftCollection, filters, criteriasCollection);
		expect(filteredCollection).toEqual(expectedCollection);
	});

	test('it should return objects price <= 500', () => {
		const filters = {'maxPrice': 500};
		const expectedCollection = [gift1, gift2];
		const filteredCollection = filter(giftCollection, filters, criteriasCollection);
		expect(filteredCollection).toEqual(expectedCollection);
	});	

	test('it should return objects for 2 persons', () => {
		const filters = {'forPersons': 2};
		const expectedCollection = [gift2, gift3];
		const filteredCollection = filter(giftCollection, filters, criteriasCollection);
		expect(filteredCollection).toEqual(expectedCollection);
	});	

	test('it should return objects for 1 persons', () => {
		const filters = {'forPersons': 1};
		const expectedCollection = [gift1, gift2, gift4];
		const filteredCollection = filter(giftCollection, filters, criteriasCollection);
		expect(filteredCollection).toEqual(expectedCollection);
	});

	test('it should return objects for 4 persons', () => {
		const filters = {'forPersons': 4};
		const expectedCollection = [gift3];
		const filteredCollection = filter(giftCollection, filters, criteriasCollection);
		expect(filteredCollection).toEqual(expectedCollection);
	});		

	test('it should return objects for 2 persons AND price < 600', () => {
		const filters = {'forPersons': 2, 'maxPrice': 600};
		const expectedCollection = [gift2];
		const filteredCollection = filter(giftCollection, filters, criteriasCollection);
		expect(filteredCollection).toEqual(expectedCollection);
	});			

	test('it should return objects for city = Lyon', () => {
		const filters = {'city': 'Lyon'};
		const expectedCollection = [gift2, gift4];
		const filteredCollection = filter(giftCollection, filters, criteriasCollection);
		expect(filteredCollection).toEqual(expectedCollection);
	});

	test('it should return objects for city = Lyon AND price < 700', () => {
		const filters = {'city': 'Lyon', 'maxPrice': 700};
		const expectedCollection = [gift2];
		const filteredCollection = filter(giftCollection, filters, criteriasCollection);
		expect(filteredCollection).toEqual(expectedCollection);
	});		

});
