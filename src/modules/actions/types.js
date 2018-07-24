// @flow

import type { BoxCollection, BoxSearchModuleState, FilterName, FilterOperand } from 'modules/boxSearch/types';
import type { RouterState} from 'modules/router/types';

export type { BoxCollection } from 'modules/boxSearch/types';
export type DisplayType = 'list' | 'card';
export type FilterStatistic = { type: 'absolute' | 'relative', stat: number };
export type FiltersStatisticsByFilter = { +[FilterName]: FilterStatistic };
export type FiltersApplied = { +[FilterName]: FilterOperand};
export type BoxesStatistics = {|
	filtersStatisticsByFilter: FiltersStatisticsByFilter,
	totalNumberOfBoxes: number,
	numberOfMatchingBoxes: number
|};

export type BoxCollectionRequestData = {|
	universe: string,
	filtersApplied: FiltersApplied,
	orderBy: string,
	page: number
|};

export type WorkerResponseDataForBoxCollectionRequest = 
	  { type: 'BOX_LIST', boxList: BoxCollection }
	| { type: 'BOXES_STATISTICS', boxesStatistics: BoxesStatistics };




export type State = {|
	boxSearch: BoxSearchModuleState,
	router: RouterState
|};
	
export 
type Action = 
	  { type: 'BOX_LIST_SEARCH/SET_APPLIED_FILTERS', filtersToApply: FiltersApplied }
	| { type: 'BOX_LIST_SEARCH/RESET_APPLIED_FILTERS', filtersToReset: Array<FilterName>}
	| { type: 'BOX_LIST_SEARCH/RESET_ALL_APPLIED_FILTERS'}
	| { type: 'BOX_LIST_SEARCH/SET_ORDER_BY', orderBy: string }
	| { type: 'BOX_LIST_SEARCH/SET_UNIVERSE', universe: string }
	| { type: 'BOX_LIST_SEARCH/FETCH_REQUESTED' }
	| { type: 'BOX_LIST_SEARCH/SET_BOX_LIST', boxList: BoxCollection }
	| { type: 'BOX_LIST_SEARCH/APPEND_TO_BOX_LIST', boxList: BoxCollection }
	| { type: 'BOX_LIST_SEARCH/HAS_FETCH_SUCCEEDED', success: boolean}
	| { type: 'BOX_LIST_SEARCH/SET_DISPLAY_BY', displayBy: DisplayType}
	| { type: 'BOX_LIST_SEARCH/SET_PAGE', page: number}
	| { type: 'BOX_LIST_SEARCH/INCREMENT_PAGE'}
	| { type: 'BOX_LIST_SEARCH/SET_BOXES_STATISTICS', boxesStatistics: BoxesStatistics };
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
