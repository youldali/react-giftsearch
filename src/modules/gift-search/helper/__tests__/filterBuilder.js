import * as filterBuilder from '../filterBuilder';
import * as config from 'config';

const gift1 = {'name': 'Paris', 'price': 205, 'min_persons': 1,'max_persons': 1};
const gift2 = {'name': 'Lyon', 'price': 350, 'min_persons': 1,'max_persons': 2};
const gift3 = {'name': 'Barcelona', 'price': 700.5, 'min_persons': 2,'max_persons': 6};

beforeAll(() => {
	config.filterConfig = {
		'maxPrice': [{ 'field': 'price', 'operator': '<=' }],
		'forPersons': [{ 'field': 'min_persons', 'operator': '>=' }, { 'field': 'max_persons', 'operator': '<=' }],
	};
});



describe.only('buildFilterSubQuery', () => {

	test('it should return full query', () => {
		const filters = {'maxPrice': 500};
		const query = filterBuilder.buildFilterSubQuery(gift1, filters['maxPrice'], config.filterConfig['maxPrice'], 'gift1'); 
		const expectedQuery = 'AND price <= 500';
		expect(query).toBe(expectedQuery);			
	});	

});

describe.skip('buildFilterQuery', () => {

	test('it should return full query', () => {
		const filters = {'maxPrice': 500};
		const query = filterBuilder.buildFilterQuery(gift1, filters, 'gift1')
		const expectedQuery = 'true AND maxPrice <= 500';
		expect(query).toBe(expectedQuery);			
	});	

});


