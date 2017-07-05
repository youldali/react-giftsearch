// @flow
import type { Action } from '../actions/';

type GiftListState = {
	+giftList: Array<Object>,
	+isFetching: boolean
};

const initialState = {
	giftList: [],
	isFetching: false
}

function giftListReducer (state: GiftListState = initialState, action: Action): GiftListState {
	switch (action.type){
		case "SET_GIFT_LIST":
			return {
				giftList: [...action.giftList],
				isFetching: state.isFetching
			};
		case "IS_FETCHING_GIFT_LIST":
			return {
				...state, 
				isFetching: action.isFetching
			};
		default:
			return state;		
	}
}

export default giftListReducer;