import universeReducer from '../universe';

test('it initializes the state', function(){
	expect(universeReducer(undefined, {})).toBe('');
})

test('it sets the universe', function(){
	const action = {
		type: "GIFT_LIST_SEARCH/SET_UNIVERSE",
		universe: 'sejour'
	}
	expect(universeReducer('', action)).toBe('sejour');
})