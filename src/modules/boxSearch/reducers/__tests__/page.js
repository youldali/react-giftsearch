import pageReducer from '../page.js';
const initialState = 1;

test('it initializes state', () => {
	const newState = pageReducer(undefined, {});
	expect(newState).toBe(initialState);
});

test('it changes the page state', () => {
	const action = {
		type: "BOX_LIST_SEARCH/SET_PAGE",
		page: 22
	};
	const newState = pageReducer(2, action);
	expect(newState).toBe(22);
});

test('it increments the page state', () => {
	const action = {
		type: "BOX_LIST_SEARCH/INCREMENT_PAGE",
	};
	const newState = pageReducer(5, action);
	expect(newState).toBe(6);
});

test('it resets the page state', () => {
	const action = {
		type: "BOX_LIST_SEARCH/SET_APPLIED_FILTERS",
	};
	const newState = pageReducer(2, action);
	expect(newState).toBe(initialState);
});