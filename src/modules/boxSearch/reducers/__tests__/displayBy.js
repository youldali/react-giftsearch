import displayByReducer from '../displayBy.js';

test('it initializes state', () => {
	const newState = displayByReducer(undefined, {});
	expect(newState).toBe('list');
});

test('it changes the display state', () => {
	const action = {
		type: "BOX_LIST_SEARCH/SET_DISPLAY_BY",
		displayBy: 'card'
	};
	const newState = displayByReducer('list', action);
	expect(newState).toBe('card');
});