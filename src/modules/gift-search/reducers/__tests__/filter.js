import filterReducer from '../filter.js';

test('it initializes state', () => {
	const newState = filterReducer(undefined, {});
	expect(newState).toEqual({});
});

test('it adds a filter', () => {
	const action = {
		type: "SET_FILTER",
		filters:{
			'name': 'myFilter'
		}
	};
	const newState = filterReducer({}, action);
	expect(newState).toEqual({'name': 'myFilter'});	
});

test('it resets a filter already set', () => {
	const action = {
		type: "RESET_FILTER",
		filters: ['name', 'surname']
	};
	const newState = filterReducer({'name': 'myFilterValue', 'lastname': 'myLastname', 'surname': 'mySurname'}, action);
	expect(newState).toEqual({'name': '', 'lastname': 'myLastname', 'surname': ''});	
});

test('it resets a filter that does not exist', () => {
	const action = {
		type: "RESET_FILTER",
		filters: ['name']
	};
	const newState = filterReducer({}, action);
	expect(newState).toEqual({'name': ''});	
});