import filterReducer from '../filter.js';

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
		const newState = filterReducer({}, action);
		expect(newState).toEqual({'name': 'myFilter'});	
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
		const newState = filterReducer({}, action);
		expect(newState).toEqual({'name': 'myFilter', 'price': 1234, 'value': 'val'});	
	});

});

describe('GIFT_LIST_SEARCH/RESET_FILTERS', () => {

	test('it resets a filter already set', () => {
		const action = {
			type: "GIFT_LIST_SEARCH/RESET_FILTERS",
			filtersToReset: ['name', 'surname']
		};
		const newState = filterReducer({'name': 'myFilterValue', 'lastname': 'myLastname', 'surname': 'mySurname'}, action);
		expect(newState).toEqual({'lastname': 'myLastname'});	
	});

	test('it resets a filter that does not exist', () => {
		const action = {
			type: "GIFT_LIST_SEARCH/RESET_FILTERS",
			filtersToReset: ['name']
		};
		const newState = filterReducer({}, action);
		expect(newState).toEqual({});	
	});

});