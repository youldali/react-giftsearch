 // @flow
import type { Action, GiftList, Filters, Dispatch } from './types';
import giftFetcher from '../gift-search/helper/fetchGiftsRemotely';
import { storageGetGifts, storageSaveGifts } from '../gift-search/helper/fetchGiftsStorage';


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

function fetchGiftListFails(failure: boolean): Action{
	return{
		type: "HAS_FETCH_GIFT_LIST_FAILED",
		failure
	}	
}

function setGiftList(giftList: GiftList): Action{
return{
		type: "SET_GIFT_LIST",
		giftList
	}		
}

function fetchGiftRemotely (universe: string ): Function{
	return (dispatch: Dispatch): Promise<GiftList> => {
		dispatch(isFetchingGiftList(true));
		
		return giftFetcher(universe)
						.then( giftList => {
							dispatch(isFetchingGiftList(false));
							dispatch(setGiftList(giftList));
							return giftList;
						});
	};
}

function fetchGiftLocally (universe: string ): Function{
	return (dispatch: Dispatch): Promise<GiftList> => {		
		return storageGetGifts(universe)
						.then( giftList => {
							dispatch(setGiftList(giftList));
							return giftList;
						});
	};
}
export function fetchGiftList(universe: string){
	return (dispatch: Dispatch) => {
		return (
			fetchGiftLocally(universe)(dispatch)
				.then( () => dispatch(fetchGiftListFails(false)) )
				.catch( e => {
					fetchGiftRemotely(universe)(dispatch)
						.then( 
							giftList => {
								dispatch(fetchGiftListFails(false));
								storageSaveGifts(universe, giftList)
									.catch(e => console.log('Error saving Gift List', e));
							},
							error => {
								dispatch(fetchGiftListFails(true));
							}
						);
				})
		);
	}
}
