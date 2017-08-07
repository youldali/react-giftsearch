import pageReducer from '../page.js';

test('it initializes state', () => {
	const newState = pageReducer(undefined, {});
	expect(newState).toBe(1);
});

test('it changes the page state', () => {
	const action = {
		type: "GIFT_LIST_SEARCH/SET_PAGE",
		page: 22
	};
	const newState = pageReducer({page: 2}, action);
	expect(newState).toBe(22);
});