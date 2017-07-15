//Types

export
type Filters = { [string]: string };

export
type GiftList = Array<Object>;

export 
type Action = 
		{ type: 'SET_FILTER', filters: Filters }
	| { type: 'RESET_FILTER', filters: Array<string>}
	| { type: 'SET_ORDER', order: string }
	| { type: 'SET_UNIVERSE', universe: string }
	| { type: 'IS_FETCHING_GIFT_LIST', isFetching: boolean }
	| { type: 'SET_GIFT_LIST', giftList: GiftList }
	| { type: 'FETCH_GIFT_LIST_SUCCESS', success: boolean};

export 
type Dispatch = (action: Action | ThunkAction | Promise<Action> | Array<Action>) => any;

export 
type GetState = () => Object;

export 
type ThunkAction = (dispatch: Dispatch, getState: GetState) => any;