// @flow
import type { Action, GiftCollection, Filters } from 'modules/actions/types';
import { selectors as filterSelectors } from './filter';
import { selectors as orderSelectors } from './order';
import { selectors as pageSelectors } from './page';
import { createSelector } from 'reselect';
import filterList from 'modules/helpers/list-filtered-with-config/filterList';
import sortList from 'modules/helpers/list-filtered-with-config/sortList';
import { filterConfig } from 'modules/gift-search/config';

type GiftListState = {
	+collection: GiftCollection,
	+isFetching: boolean,
	+fetchSuccess: boolean
};

const initialState = {
	collection: [],
	isFetching: false,
	fetchSuccess: true
}

function giftListReducer (state: GiftListState = initialState, action: Action): GiftListState {
	switch (action.type){
		case "GIFT_LIST_SEARCH/SET_LIST":
			return {
				...state,
				collection: [...action.giftList],
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
const getList = (state: Object) => (state.giftSearch.giftList.collection);

const getFilteredList = createSelector(
  [getList, filterSelectors.getFilters],
  (stateGiftList: GiftCollection, stateGiftFilters: Filters): GiftCollection => filterList(stateGiftList, stateGiftFilters, filterConfig)
);

const getOrderedFilteredList = createSelector(
  [getFilteredList, orderSelectors.getOrder],
  (stateGiftListFiltered: GiftCollection, stateGiftOrder: string): GiftCollection => sortList(stateGiftListFiltered, stateGiftOrder)
);

const getPaginatedOrderedFilteredList = createSelector(
  [getOrderedFilteredList, pageSelectors.getPage],
  (stateGiftListOrderedFiltered: GiftCollection, statePage: number): GiftCollection => stateGiftListOrderedFiltered.slice(0, 2 * statePage)
);


export 
const selectors = {
	getList,
	getFilteredList,
	getOrderedFilteredList,
	getPaginatedOrderedFilteredList
};
