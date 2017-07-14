import giftListReducer from '../gift-list';

const initialState = {
	giftList: [],
	isFetching: false,
	hasFetchFailed: false
};

test('it should initialize state', () => {
	expect(giftListReducer(undefined, {})).toEqual(initialState);
});

test('it should update the isFetching property', () => {
	const expectedState = {
		giftList: [],
		isFetching: true,
		hasFetchFailed: false
	}	
	const action = {
		type: "IS_FETCHING_GIFT_LIST",
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
		giftList: myGiftList,
		isFetching: false,
		hasFetchFailed: false
	}	
	const action = {
		type: "SET_GIFT_LIST",
		giftList: myGiftList
	}
	expect(giftListReducer(initialState, action)).toEqual(expectedState);
});

test('it should update the hasFetched property', () => {
	const expectedState = {
		giftList: [],
		isFetching: false,
		hasFetchFailed: true
	}	
	const action = {
		type: "HAS_FETCH_GIFT_LIST_FAILED",
		failure: true
	}
	expect(giftListReducer(initialState, action)).toEqual(expectedState);
});