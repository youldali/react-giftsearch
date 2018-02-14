// @flow

export type FilterValue = number | string | boolean;
export type Filters = { [string]: FilterValue};
export type DisplayType = 'list' | 'card';

export 
type Gift = {
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
type GiftCollection = Array<Gift>;

export 
type Action = 
	  { type: 'GIFT_LIST_SEARCH/SET_FILTERS', filters: Filters }
	| { type: 'GIFT_LIST_SEARCH/RESET_FILTERS', filtersToReset: Array<string>}
	| { type: 'GIFT_LIST_SEARCH/RESET_ALL_FILTERS'}
	| { type: 'GIFT_LIST_SEARCH/SET_ORDER', order: string }
	| { type: 'GIFT_LIST_SEARCH/SET_UNIVERSE', universe: string }
	| { type: 'GIFT_LIST_SEARCH/FETCH_REQUESTED', isFetching: boolean }
	| { type: 'GIFT_LIST_SEARCH/SET_LIST', giftList: GiftCollection }
	| { type: 'GIFT_LIST_SEARCH/FETCH_SUCCEEDED', success: boolean}
	| { type: 'GIFT_LIST_SEARCH/SET_DISPLAY', display: DisplayType}
	| { type: 'GIFT_LIST_SEARCH/SET_PAGE', page: number}
	| { type: 'GIFT_LIST_SEARCH/INCREMENT_PAGE'}
	| { type: 'GIFT_LIST_SEARCH/DECREMENT_PAGE'};

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
