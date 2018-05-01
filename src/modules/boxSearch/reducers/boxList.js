// @flow
import type { Action } from 'modules/actions/types';
import type { BoxCollection } from '../types';
import { selectors as pageSelectors } from './page';
import { createSelector } from 'reselect';

type GiftListState = {
	+collection: BoxCollection,
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
		case "BOX_LIST_SEARCH/SET_BOX_LIST":
			return {
				collection: action.boxList,
				isFetching: false,
				fetchSuccess: true
			};

		case "BOX_LIST_SEARCH/APPEND_TO_BOX_LIST":
			return {
				collection: [...state.collection, ...action.boxList],
				isFetching: false,
				fetchSuccess: true
			};

		case "BOX_LIST_SEARCH/FETCH_REQUESTED":
			return {
				...state, 
				isFetching: action.isFetching
			};

		case "BOX_LIST_SEARCH/HAS_FETCH_SUCCEEDED":
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
const getList = (state: Object): BoxCollection  => (state.boxSearch.boxList.collection);
const isFetching = (state: Object): boolean => (state.boxSearch.boxList.isFetching);
const hasFetchSucceeded = (state: Object): boolean => (state.boxSearch.boxList.fetchSuccess);

const getPaginatedOrderedFilteredList = createSelector(
  [getList, pageSelectors.getPage],
  (boxList: BoxCollection, page: number): BoxCollection => boxList.slice(0, 10 * page)
);


export 
const selectors = {
	isFetching,
	hasFetchSucceeded,
	getList,
	getPaginatedOrderedFilteredList,
};
