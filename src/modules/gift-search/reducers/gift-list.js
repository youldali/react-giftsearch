// @flow
import type { Action, GiftCollection } from 'modules/actions/types';
import { selectors as pageSelectors } from './page';
import { createSelector } from 'reselect';

type GiftListState = {
	+collection: GiftCollection,
	+isFetching: boolean,
	+fetchSuccess: boolean
};

const initialState = {
	collection: [],
	isFetching: true,
	fetchSuccess: true
}

function giftListReducer (state: GiftListState = initialState, action: Action): GiftListState {
	switch (action.type){
		case "GIFT_LIST_SEARCH/SET_LIST":
			return {
				collection: action.giftList,
				isFetching: false,
				fetchSuccess: true
			};

		case "GIFT_LIST_SEARCH/APPEND_TO_LIST":
			return {
				collection: [...state.collection, ...action.giftList],
				isFetching: false,
				fetchSuccess: true
			};

		case "GIFT_LIST_SEARCH/FETCH_REQUESTED":
			return {
				...state, 
				isFetching: action.isFetching
			};

		case "GIFT_LIST_SEARCH/FETCH_SUCCEEDED":
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

//selectors
const getList = (state: Object): GiftCollection  => (state.giftSearch.giftList.collection);
const isFetching = (state: Object): boolean => (state.giftSearch.giftList.isFetching);
const hasFetchSucceeded = (state: Object): boolean => (state.giftSearch.giftList.fetchSuccess);

const getPaginatedOrderedFilteredList = createSelector(
  [getList, pageSelectors.getPage],
  (giftList: GiftCollection, page: number): GiftCollection => giftList.slice(0, 10 * page)
);


export 
const selectors = {
	isFetching,
	hasFetchSucceeded,
	getList,
	getPaginatedOrderedFilteredList,
};
