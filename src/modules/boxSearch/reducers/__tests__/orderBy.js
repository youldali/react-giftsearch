import orderByReducer from '../orderBy.js';

const initialState = '';
describe('initial state', () => {
	test('it initializes state', () => {
		const newState = orderByReducer(undefined, {});
		expect(newState).toBe(initialState);
	});
});


describe('SET ORDER BY', () => {
	test('it changes the order state', () => {
		const action = {
			type: "BOX_LIST_SEARCH/SET_ORDER_BY",
			orderBy: 'new value'
		};
		const newState = orderByReducer('value!', action);
		expect(newState).toBe('new value');
	});
});
