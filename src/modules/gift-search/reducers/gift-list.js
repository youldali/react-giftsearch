// @flow
import type { Action, GiftCollection } from 'modules/actions/types';

type GiftListState = {
	+giftList: GiftCollection,
	+isFetching: boolean,
	+fetchSuccess: boolean
};

const initialState = {
	giftList: [],
	isFetching: false,
	fetchSuccess: true
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
		case "FETCH_GIFT_LIST_SUCCESS":
			return {
				...state,
				isFetching: false,
				fetchSuccess: action.success				
			};
		default:
			return state;		
	}
}

export default giftListReducer;