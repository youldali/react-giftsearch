import * as actions from '../gift-list-refinement';

test('it should return the "set filter" action creator', function(){
	const expectedAction = {
		type: "SET_FILTER",
		filters: {
			'name': 'jean'
		}
	};

	expect(actions.setFilter({'name': 'jean'})).toEqual(expectedAction);
})

test('it should return the "reset filter" action creator', function(){
	const expectedAction = {
		type: "RESET_FILTER",
		filters: ['prenom'],
	};

	expect(actions.resetFilter(['prenom'])).toEqual(expectedAction);
})

test('it should return the "set order" action creator', function(){
	const expectedAction = {
		type: "SET_ORDER",
		order: 'nom',
	};

	expect(actions.setOrder('nom')).toEqual(expectedAction);
})

test('it should return the "set universe" action creator', function(){
	const expectedAction = {
		type: "SET_UNIVERSE",
		universe: 'sejour',
	};

	expect(actions.setUniverse('sejour')).toEqual(expectedAction);
})
