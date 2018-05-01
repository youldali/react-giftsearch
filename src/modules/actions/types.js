// @flow
import type { BoxCollection, FilterName, FilterOperand } from 'modules/boxSearch/types';
import { LOCATION_CHANGE } from 'react-router-redux';

export type { BoxCollection } from 'modules/boxSearch/types';
export type DisplayType = 'list' | 'card';
export type FilterStatistic = { type: 'absolute' | 'relative', stat: number };
export type FiltersStatisticsByFilter = { [FilterName]: FilterStatistic };
export type FiltersAppliedState = { [FilterName]: FilterOperand};

export type BoxCollectionRequestData = {
	universe: string,
	filtersApplied: FiltersAppliedState,
	orderBy: string,
	page: number
};

export type WorkerResponseDataForBoxCollectionRequest = 
	  { type: 'BOX_LIST', boxList: BoxCollection }
	| { type: 'FILTERS_STATISTICS', filtersStatisticsByFilter: FiltersStatisticsByFilter };

	
export 
type Action = 
	  { type: 'BOX_LIST_SEARCH/SET_APPLIED_FILTERS', filtersApplied: FiltersAppliedState }
	| { type: 'BOX_LIST_SEARCH/RESET_APPLIED_FILTERS', filtersAppliedToReset: Array<FilterName>}
	| { type: 'BOX_LIST_SEARCH/RESET_ALL_APPLIED_FILTERS'}
	| { type: 'BOX_LIST_SEARCH/SET_ORDER_BY', orderBy: string }
	| { type: 'BOX_LIST_SEARCH/SET_UNIVERSE', universe: string }
	| { type: 'BOX_LIST_SEARCH/FETCH_REQUESTED', isFetching: boolean }
	| { type: 'BOX_LIST_SEARCH/SET_BOX_LIST', boxList: BoxCollection }
	| { type: 'BOX_LIST_SEARCH/APPEND_TO_BOX_LIST', boxList: BoxCollection }
	| { type: 'BOX_LIST_SEARCH/HAS_FETCH_SUCCEEDED', success: boolean}
	| { type: 'BOX_LIST_SEARCH/SET_DISPLAY_BY', displayBy: DisplayType}
	| { type: 'BOX_LIST_SEARCH/SET_PAGE', page: number}
	| { type: 'BOX_LIST_SEARCH/INCREMENT_PAGE'}
	| { type: 'BOX_LIST_SEARCH/DECREMENT_PAGE'}
	| { type: 'BOX_LIST_SEARCH/SET_FILTERS_STATISTICS', filtersStatisticsByFilter: FiltersStatisticsByFilter }
	| { type: LOCATION_CHANGE, payload: Object };

export 
type Dispatch = (action: Action | ThunkAction | Promise<Action> | Array<Action>) => any;

export 
type GetState = () => Object;

export 
type ThunkAction = (dispatch: Dispatch, getState: GetState) => any;

export
type RouterLocation = {
	key: string, // not with HashHistory!
  	pathname: string,
  	search: string,
  	hash: string
};

export
type RouterMatch = {
	isExact: boolean, // not with HashHistory!
  	params: {[string]: string},
  	path: string,
  	url: string
}
