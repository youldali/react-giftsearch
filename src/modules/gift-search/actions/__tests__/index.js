import * as actions from '../index';

test('it should return the "set filter" action creator', function(){
	const expectedAction = {
		type: actions.SET_FILTER,
		field: 'prenom',
		filter: 'jean'
	};

	expect(actions.setFilter('prenom', 'jean')).toEqual(expectedAction);
})

test('it should return the "reset filter" action creator', function(){
	const expectedAction = {
		type: actions.RESET_FILTER,
		field: 'prenom',
	};

	expect(actions.resetFilter('prenom')).toEqual(expectedAction);
})

test('it should return the "set order" action creator', function(){
	const expectedAction = {
		type: actions.SET_ORDER,
		order: 'nom',
	};

	expect(actions.setOrder('nom')).toEqual(expectedAction);
})

test('it should return the "set universe" action creator', function(){
	const expectedAction = {
		type: actions.SET_UNIVERSE,
		universe: 'sejour',
	};

	expect(actions.setUniverse('sejour')).toEqual(expectedAction);
})