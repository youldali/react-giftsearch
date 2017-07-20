// @flow

export type FilterValue = number | string ;
export type Filters = { [string]: FilterValue};

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
	rawPrice: number
};

export
type GiftCollection = Array<Gift>;

export 
type Action = 
		{ type: 'SET_FILTER', filters: Filters }
	| { type: 'RESET_FILTER', filters: Array<string>}
	| { type: 'SET_ORDER', order: string }
	| { type: 'SET_UNIVERSE', universe: string }
	| { type: 'IS_FETCHING_GIFT_LIST', isFetching: boolean }
	| { type: 'SET_GIFT_LIST', giftList: GiftCollection }
	| { type: 'FETCH_GIFT_LIST_SUCCESS', success: boolean};

export 
type Dispatch = (action: Action | ThunkAction | Promise<Action> | Array<Action>) => any;

export 
type GetState = () => Object;

export 
type ThunkAction = (dispatch: Dispatch, getState: GetState) => any;