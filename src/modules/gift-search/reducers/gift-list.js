// @flow
import type { Action, GiftCollection, Filters } from 'modules/actions/types';
import { selectors as filterSelectors } from './filter';
import { selectors as orderSelectors } from './order';
import { selectors as pageSelectors } from './page';
import { createSelector } from 'reselect';
import filterList from 'modules/helpers/refineCollection/filteringListWithCriterias';
import sortList from 'modules/helpers/refineCollection/sortList';
import { filterConfig } from 'modules/gift-search/config';
import { findHighestValueInObjects } from 'helpers/array/utils';

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
				...state,
				collection: [...action.giftList],
				isFetching: false
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

const getFilteredList = createSelector(
  [getList, filterSelectors.getAllFilters],
  (stateGiftList: GiftCollection, stateGiftFilters: Filters): GiftCollection => filterList(stateGiftList, stateGiftFilters, filterConfig)
);

const getOrderedFilteredList = createSelector(
  [getFilteredList, orderSelectors.getOrder],
  (stateGiftListFiltered: GiftCollection, stateGiftOrder: string): GiftCollection => sortList(stateGiftListFiltered, stateGiftOrder)
);

const getPaginatedOrderedFilteredList = createSelector(
  [getOrderedFilteredList, pageSelectors.getPage],
  (stateGiftListOrderedFiltered: GiftCollection, statePage: number): GiftCollection => stateGiftListOrderedFiltered.slice(0, 10 * statePage)
);

const getHightestPrice = createSelector(
	[getList],
	(stateGiftList: GiftCollection): number => {
		if(stateGiftList.length === 0)
			return 0;
		else
			return findHighestValueInObjects(stateGiftList, 'rawPrice')
		}
);

export 
const selectors = {
	isFetching,
	hasFetchSucceeded,
	getList,
	getFilteredList,
	getOrderedFilteredList,
	getPaginatedOrderedFilteredList,
	getHightestPrice
};
