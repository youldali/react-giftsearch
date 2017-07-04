 // @flow
import giftFetcher from '../helper/universeToUrlMapping';

//Types
type Filters = { [string]: string };

export type Action = 
		{ type: 'SET_FILTER', filters: Filters }
	| { type: 'RESET_FILTER', filters: Filters}
	| { type: 'SET_ORDER', order: string }
	| { type: 'SET_UNIVERSE', universe: string };

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

export function resetFilter(filters: Filters): Action{
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


function isFetchingGiftList(isFetching: boolean){
	return{
		type: "IS_FETCHING_GIFT_LIST",
		isFetching
	}	
}

function setGiftList(giftList: Array<Object>){
return{
		type: "SET_GIFT_LIST",
		giftList
	}		
}

export function fetchGiftList(universe: string){
	return (dispatch) => {
		dispatch(isFetchingGiftList(true));
		giftFetcher(universe)
			.then( giftList => {
				dispatch(setGiftList(giftList));
				dispatch(isFetchingGiftList(false));
			});
	}
}
