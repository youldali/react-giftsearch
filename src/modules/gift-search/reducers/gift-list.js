// @flow
import type { Action } from '../actions/';

type GiftListState = {
	+giftList: Array<Object>,
	+isFetching: boolean,
	+hasFetchFailed: boolean
};

const initialState = {
	giftList: [],
	isFetching: false,
	hasFetchFailed: false
}

function giftListReducer (state: GiftListState = initialState, action: Action): GiftListState {
	switch (action.type){
		case "SET_GIFT_LIST":
			return {
				...state,
				giftList: [...action.giftList],
			};
		case "IS_FETCHING_GIFT_LIST":
			return {
				...state, 
				isFetching: action.isFetching
			};
		case "HAS_FETCH_GIFT_LIST_FAILED":
			return {
				...state, 
				hasFetchFailed: action.failure				
			};
		default:
			return state;		
	}
}

export default giftListReducer;