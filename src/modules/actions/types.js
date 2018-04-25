// @flow
import type { Filters, FilterName } from 'modules/boxSearch/types';

export type DisplayType = 'list' | 'card';

export type FilterStatistic = { type: 'absolute' | 'relative', stat: number };

export type FiltersStatisticsByFilter = { [FilterName]: FilterStatistic };

export 
type Box = {
	id: string,
	activity_name: string,
	category: Array<string>,
	city: string,
	description: string,
	name: string,
	partner_name: string,
	price: string,
	ranking: number,
	rating: string,
	short_description: string,
	sku: string,
	store_id: string,
	subtitle: string,
	universe: Array<string>,
	special_price: string,
	url: string,
	img: string,
	show_rating: boolean,
	number_activities: number,
	reviews_count: number,
	type_experience: Array<string>,
	min_persons: number,
	max_persons: number,
	min_nights: number,
	max_nights: number,	
	rawPrice: number,
	web_exclusive: boolean
};

export
type BoxCollection = Array<Box>;

export 
type Action = 
	  { type: 'BOX_LIST_SEARCH/SET_FILTERS', filters: Filters }
	| { type: 'BOX_LIST_SEARCH/RESET_FILTERS', filtersToReset: Array<FilterName>}
	| { type: 'BOX_LIST_SEARCH/RESET_ALL_FILTERS'}
	| { type: 'BOX_LIST_SEARCH/SET_ORDER', order: string }
	| { type: 'BOX_LIST_SEARCH/SET_UNIVERSE', universe: string }
	| { type: 'BOX_LIST_SEARCH/FETCH_REQUESTED', isFetching: boolean }
	| { type: 'BOX_LIST_SEARCH/SET_LIST', boxList: BoxCollection }
	| { type: 'BOX_LIST_SEARCH/APPEND_TO_LIST', boxList: BoxCollection }
	| { type: 'BOX_LIST_SEARCH/FETCH_SUCCEEDED', success: boolean}
	| { type: 'BOX_LIST_SEARCH/SET_DISPLAY', display: DisplayType}
	| { type: 'BOX_LIST_SEARCH/SET_PAGE', page: number}
	| { type: 'BOX_LIST_SEARCH/INCREMENT_PAGE'}
	| { type: 'BOX_LIST_SEARCH/DECREMENT_PAGE'}
	| { type: 'BOX_LIST_SEARCH/SET_FILTERS_STATISTICS', filtersStatistics: FiltersStatisticsByFilter };

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
