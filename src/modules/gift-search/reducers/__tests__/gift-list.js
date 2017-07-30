import giftListReducer from '../gift-list';

const initialState = {
	collection: [],
	isFetching: false,
	fetchSuccess: true
};

test('it should initialize state', () => {
	expect(giftListReducer(undefined, {})).toEqual(initialState);
});

test('it should update the isFetching property', () => {
	const expectedState = {
		collection: [],
		isFetching: true,
		fetchSuccess: true
	}	
	const action = {
		type: "GIFT_LIST_SEARCH/FETCH_REQUESTED",
		isFetching: true
	}
	expect(giftListReducer(initialState, action)).toEqual(expectedState);
});

test('it should update the gift list property', () => {
	const myGiftList = [
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
		collection: myGiftList,
		isFetching: false,
		fetchSuccess: true
	}	
	const action = {
		type: "GIFT_LIST_SEARCH/SET_LIST",
		giftList: myGiftList
	}
	expect(giftListReducer(initialState, action)).toEqual(expectedState);
});

test('it should update the "fetchSuccess" property', () => {
	const expectedState = {
		collection: [],
		isFetching: false,
		fetchSuccess: false
	}	
	const action = {
		type: "GIFT_LIST_SEARCH/FETCH_SUCCEEDED",
		success: false
	}
	expect(giftListReducer(initialState, action)).toEqual(expectedState);
});