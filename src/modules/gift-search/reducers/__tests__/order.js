import orderReducer from '../order.js';

test('it initializes state', () => {
	const newState = orderReducer(undefined, {});
	expect(newState).toBe('');
});

test('it changes the order state', () => {
	const action = {
		type: "SET_ORDER",
		order: 'new value'
	};
	const newState = orderReducer({order: 'value!'}, action);
	expect(newState).toBe('new value');
});