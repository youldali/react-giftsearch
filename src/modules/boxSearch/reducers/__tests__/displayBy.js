import displayReducer from '../displayBy.js';

test('it initializes state', () => {
	const newState = displayReducer(undefined, {});
	expect(newState).toBe('list');
});

test('it changes the display state', () => {
	const action = {
		type: "GIFT_LIST_SEARCH/SET_DISPLAY",
		display: 'card'
	};
	const newState = displayReducer('list', action);
	expect(newState).toBe('card');
});