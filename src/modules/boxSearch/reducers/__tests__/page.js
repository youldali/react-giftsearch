import pageReducer from '../page.js';
const initialState = 1;

test('it initializes state', () => {
	const newState = pageReducer(undefined, {});
	expect(newState).toBe(initialState);
});

test('it changes the page state', () => {
	const action = {
		type: "GIFT_LIST_SEARCH/SET_PAGE",
		page: 22
	};
	const newState = pageReducer(2, action);
	expect(newState).toBe(22);
});

test('it resets the page state', () => {
	const action = {
		type: "GIFT_LIST_SEARCH/SET_FILTERS",
	};
	const newState = pageReducer(2, action);
	expect(newState).toBe(initialState);
});

test('it increments the page state', () => {
	const action = {
		type: "GIFT_LIST_SEARCH/INCREMENT_PAGE",
	};
	const newState = pageReducer(5, action);
	expect(newState).toBe(6);
});

test('it decrements the page state', () => {
	const action = {
		type: "GIFT_LIST_SEARCH/DECREMENT_PAGE",
	};
	const newState = pageReducer(5, action);
	expect(newState).toBe(4);
});

test('it does not decrements the page state when page equals 0', () => {
	const action = {
		type: "GIFT_LIST_SEARCH/DECREMENT_PAGE",
	};
	const newState = pageReducer(0, action);
	expect(newState).toBe(0);
});
