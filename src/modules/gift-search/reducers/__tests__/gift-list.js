import giftListReducer from '../gift-list';

test('it should initialize state', () => {
	const initialState = {
		giftList: [],
		isFetching: false
	}
	expect(giftListReducer(undefined, {})).toEqual(initialState);
});

test('it should update the isFetching property', () => {
	const initialState = {
		giftList: [],
		isFetching: false
	}
	const expectedState = {
		giftList: [],
		isFetching: true
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

	const initialState = {
		giftList: [],
		isFetching: false
	}
	const expectedState = {
		giftList: myGiftList,
		isFetching: false
	}	
	const action = {
		type: "SET_GIFT_LIST",
		giftList: myGiftList
	}
	expect(giftListReducer(initialState, action)).toEqual(expectedState);
});