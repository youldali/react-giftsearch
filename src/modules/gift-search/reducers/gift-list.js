// @flow
import type { Action, GiftCollection, Filters } from 'modules/actions/types';
import { selectors as filterSelectors } from './filter';
import { selectors as orderSelectors } from './order';
import { createSelector } from 'reselect';
import filter from 'helpers/array-selector/filterBuilder';
import sort from 'helpers/array-selector/sorterBuilder';
import { filterConfig } from 'config';

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

//selectors
const getList = (state: Object) => (state.giftSearch.giftList.giftList);
const getFilteredList = createSelector(
  [getList, filterSelectors.getFilters],
  (stateGiftList: GiftCollection, stateGiftFilters: Filters): GiftCollection => filter(stateGiftList, stateGiftFilters, filterConfig)
);
const getOrderedFilteredList = createSelector(
  [getFilteredList, orderSelectors.getOrder],
  (stateGiftListFiltered: GiftCollection, stateGiftOrder: string): GiftCollection => sort(stateGiftListFiltered, stateGiftOrder)
);


export 
const selectors = {
	getList,
	getFilteredList,
	getOrderedFilteredList
};