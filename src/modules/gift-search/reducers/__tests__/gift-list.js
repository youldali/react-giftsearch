import giftListReducer from '../gift-list';

const initialState = {
	giftList: [],
	isFetching: false,
	fetchSuccess: true
};

test('it should initialize state', () => {
	expect(giftListReducer(undefined, {})).toEqual(initialState);
});

test('it should update the isFetching property', () => {
	const expectedState = {
		giftList: [],
		isFetching: true,
		fetchSuccess: true
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
		fetchSuccess: true
	}	
	const action = {
		type: "SET_GIFT_LIST",
		giftList: myGiftList
	}
	expect(giftListReducer(initialState, action)).toEqual(expectedState);
});

test('it should update the "fetchSuccess" property', () => {
	const expectedState = {
		giftList: [],
		isFetching: false,
		fetchSuccess: false
	}	
	const action = {
		type: "FETCH_GIFT_LIST_SUCCESS",
		success: false
	}
	expect(giftListReducer(initialState, action)).toEqual(expectedState);
});