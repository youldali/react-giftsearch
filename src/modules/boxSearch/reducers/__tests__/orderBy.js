import orderReducer from '../orderBy.js';

const initialState = '';
describe('initial state', () => {

	test('it initializes state', () => {
		const newState = orderReducer(undefined, {});
		expect(newState).toBe(initialState);
	});

});


describe('SET ORDER', () => {

	test('it changes the order state', () => {
		const action = {
			type: "GIFT_LIST_SEARCH/SET_ORDER",
			order: 'new value'
		};
		const newState = orderReducer('value!', action);
		expect(newState).toBe('new value');
	});

});


describe('SET FILTER', () => {

	test('it does not change the order state', () => {
		const action = {
			type: "GIFT_LIST_SEARCH/SET_FILTERS",
			filters: {name: 'test', type: 'voyage'}
		};
		const newState = orderReducer('value', action);
		expect(newState).toBe('value');
	});

	test('it changes the order state when the elastic search filter is defined', () => {
		const action = {
			type: "GIFT_LIST_SEARCH/SET_FILTERS",
			filters: {name: 'test', type: 'voyage', elasticSearch: [1, 52, 38]}
		};
		const newState = orderReducer('value', action);
		expect(newState).toEqual([1, 52, 38]);
	});

});

describe('RESET FILTER', () => {

	test('it does not change the order state when state is not an array', () => {
		const action = {
			type: "GIFT_LIST_SEARCH/RESET_FILTERS",
			filtersToReset: ['name', 'type', 'personne', 'elasticSearch']
		};
		const newState = orderReducer('value', action);
		expect(newState).toBe('value');
	});

	test('it does not change the order state when elasticSearch filter is not reset', () => {
		const action = {
			type: "GIFT_LIST_SEARCH/RESET_FILTERS",
			filtersToReset: ['name', 'type', 'personne']
		};

		const currentState = [1, 2, 7];
		const newState = orderReducer(currentState, action);
		expect(newState).toBe(currentState);
	});

	test('it does changes the order state when elasticSearch filter is reset AND order state is an array', () => {
		const action = {
			type: "GIFT_LIST_SEARCH/RESET_FILTERS",
			filtersToReset: ['name', 'type', 'personne', 'elasticSearch']
		};

		const currentState = [1, 2, 7];
		const newState = orderReducer(currentState, action);
		expect(newState).toBe(initialState);
	});
	

});

