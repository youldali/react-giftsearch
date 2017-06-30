import filterReducer from '../filter.js';
import {SET_FILTER, RESET_FILTER} from '../../actions/';

test('it initializes state', () => {
	const newState = filterReducer(undefined, {});
	expect(newState).toEqual({});
});

test('it adds a filter', () => {
	const action = {
		type: SET_FILTER,
		field: 'nom',
		filter: 'myFilter'
	};
	const newState = filterReducer({}, action);
	expect(newState).toEqual({'nom': 'myFilter'});	
});

test('it resets a filter already set', () => {
	const action = {
		type: RESET_FILTER,
		field: 'nom',
	};
	const newState = filterReducer({'nom': 'myFilter'}, action);
	expect(newState).toEqual({'nom': ''});	
});

test('it resets a filter that does not exist', () => {
	const action = {
		type: RESET_FILTER,
		field: 'nom',
	};
	const newState = filterReducer({}, action);
	expect(newState).toEqual({'nom': ''});	
});