import boxListReducer from '../boxList';

const initialState = {
	collection: [],
	isFetching: true,
	fetchSuccess: true
};

test('it should initialize state', () => {
	expect(boxListReducer(undefined, {})).toEqual(initialState);
});

test('it should update the isFetching property', () => {
	const expectedState = {
		collection: [],
		isFetching: true,
		fetchSuccess: true
	}	
	const action = {
		type: "BOX_LIST_SEARCH/FETCH_REQUESTED",
		isFetching: true
	}
	expect(boxListReducer(initialState, action)).toEqual(expectedState);
});

test('it should update the box list property', () => {
	const myBoxList = [
		{
			id: 100,
			name: 'adrenaline',
			price: 550
		},
		{
			id: 101,
			name: 'sejour in europe',
			price: 100
		},		
	];

	const expectedState = {
		collection: myBoxList,
		isFetching: false,
		fetchSuccess: true
	}	
	const action = {
		type: "BOX_LIST_SEARCH/SET_BOX_LIST",
		boxList: myBoxList
	}
	expect(boxListReducer(initialState, action)).toEqual(expectedState);
});

test('it should update the "fetchSuccess" property', () => {
	const expectedState = {
		collection: [],
		isFetching: false,
		fetchSuccess: false
	}	
	const action = {
		type: "BOX_LIST_SEARCH/HAS_FETCH_SUCCEEDED",
		success: false
	}
	expect(boxListReducer(initialState, action)).toEqual(expectedState);
});