 // @flow
import giftFetcher from '../helper/universeToUrlMapping';

//Types
type Filters = { [string]: string };

export type Action = 
		{ type: 'SET_FILTER', filters: Filters }
	| { type: 'RESET_FILTER', filters: Filters}
	| { type: 'SET_ORDER', order: string }
	| { type: 'SET_UNIVERSE', universe: string }
	| { type: 'IS_FETCHING_GIFT_LIST', isFetching: boolean }
	| { type: 'SET_GIFT_LIST', giftList: Array<Object> };

export type Dispatch = (action: Action | ThunkAction | Promise<Action> | Array<Action>) => any;
export type GetState = () => Object;
export type ThunkAction = (dispatch: Dispatch, getState: GetState) => any;


//Action creators
export function setFilter(filters: Filters): Action {
	return{
		type: "SET_FILTER",
		filters
	}
};

export function resetFilter(filters: Array<string>): Action{
	return{
		type: "RESET_FILTER",
		filters
	}
};

export function setOrder(order: string): Action{
	return{
		type: "SET_ORDER",
		order
	}
};

export function setUniverse(universe: string): Action{
	return{
		type: "SET_UNIVERSE",
		universe
	}
}


function isFetchingGiftList(isFetching: boolean): Action{
	return{
		type: "IS_FETCHING_GIFT_LIST",
		isFetching
	}	
}

function setGiftList(giftList: Array<Object>): Action{
return{
		type: "SET_GIFT_LIST",
		giftList
	}		
}

export function fetchGiftList(universe: string){
	return (dispatch: Dispatch) => {
		dispatch(isFetchingGiftList(true));
		
		return giftFetcher(universe)
			.then( giftList => {
				dispatch(isFetchingGiftList(false));
				dispatch(setGiftList(giftList));
			});
	}
}
