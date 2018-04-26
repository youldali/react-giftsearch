import filterReducer from '../selectedFilters.js';

test('it initializes state', () => {
	const newState = filterReducer(undefined, {});
	expect(newState).toEqual({});
});


describe('GIFT_LIST_SEARCH/SET_FILTERS', () => {

	test('it adds a filter', () => {
		const action = {
			type: "GIFT_LIST_SEARCH/SET_FILTERS",
			filters:{
				'name': 'myFilter',
			},
			'filtersToReset': []
		};

		const prevState = {};
		const newState = filterReducer({}, action);

		expect(newState).toEqual({'name': 'myFilter'});	
		expect(newState).not.toBe(prevState);

	});

	test('it adds multiple filters', () => {
		const action = {
			type: "GIFT_LIST_SEARCH/SET_FILTERS",
			filters:{
				'name': 'myFilter',
				'price': 1234,
				'value': 'val',
			},
			'filtersToReset': []
		};

		const prevState = {};
		const newState = filterReducer(prevState, action);

		expect(newState).toEqual({'name': 'myFilter', 'price': 1234, 'value': 'val'});
		expect(newState).not.toBe(prevState);

	});

});

describe('GIFT_LIST_SEARCH/RESET_FILTERS', () => {

	test('it resets a filter already set', () => {
		const action = {
			type: "GIFT_LIST_SEARCH/RESET_FILTERS",
			filtersToReset: ['name', 'surname']
		};

		const prevState = {'name': 'myFilterValue', 'lastname': 'myLastname', 'surname': 'mySurname'};
		const newState = filterReducer(prevState, action);

		expect(newState).toEqual({'lastname': 'myLastname'});	
		expect(newState).not.toBe(prevState);
	});

	test('it resets a filter that does not exist', () => {
		const action = {
			type: "GIFT_LIST_SEARCH/RESET_FILTERS",
			filtersToReset: ['name']
		};
		const prevState = {};
		const newState = filterReducer(prevState, action);

		expect(newState).toEqual({});	
		expect(newState).toBe(prevState);	
	});

test('it resets a filter that does not exist (2)', () => {
		const action = {
			type: "GIFT_LIST_SEARCH/RESET_FILTERS",
			filtersToReset: ['name']
		};
		const prevState = {surname: 'test'};
		const newState = filterReducer(prevState, action);

		expect(newState).toBe(prevState);	
	});	

});

describe('GIFT_LIST_SEARCH/RESET_ALL_FILTERS', () => {

	test('it resets all filters with filter already existing', () => {
		const action = {
			type: "GIFT_LIST_SEARCH/RESET_ALL_FILTERS",
		};
		const prevState = {surname: 'test', name: 'andre'};
		const newState = filterReducer(prevState, action);

		expect(newState).not.toBe(prevState);
		expect(newState).toEqual({});	
	});	

test('it resets all filters without filter already existing', () => {
		const action = {
			type: "GIFT_LIST_SEARCH/RESET_ALL_FILTERS",
		};
		const prevState = {};
		const newState = filterReducer(prevState, action);

		expect(newState).toBe(prevState);
		expect(newState).toEqual({});	
	});		

});