 // @flow
import type { Action, GiftList, Dispatch, ThunkAction } from './types';
import giftFetcher from '../gift-search/helper/fetchGiftsRemotely';
import { storageGetGifts, storageSaveGifts } from '../gift-search/helper/fetchGiftsStorage';

export
function isFetchingGiftList(isFetching: boolean): Action{
	return{
		type: "IS_FETCHING_GIFT_LIST",
		isFetching
	}	
}

export
function fetchGiftListSucceeds(success: boolean): Action{
	return{
		type: "FETCH_GIFT_LIST_SUCCESS",
		success
	}	
}

export
function setGiftList(giftList: GiftList): Action{
return{
		type: "SET_GIFT_LIST",
		giftList
	}		
}

export
function fetchGiftListRemotely (universe: string ): Function{
	return (dispatch: Dispatch): Promise<GiftList> => {
		dispatch(isFetchingGiftList(true));
		
		return giftFetcher(universe)
						.catch( e => {
							dispatch(fetchGiftListSucceeds(false))
							return Promise.reject(e);
						})
						.then( giftList => {
							dispatch(fetchGiftListSucceeds(true))
							dispatch(setGiftList(giftList));
							storageSaveGifts(universe, giftList)
								.catch(e => console.log('Error saving Gift List', e));
							return giftList;
						});
	};
}

export
function fetchGiftListLocally (universe: string ): Function{
	return (dispatch: Dispatch): Promise<GiftList> => {		
		return storageGetGifts(universe)
						.then( giftList => {
							dispatch(setGiftList(giftList));
							return giftList;
						});
	};
}

export 
function fetchGiftList(universe: string){
	return (dispatch: Dispatch): ThunkAction => {
		return (
			fetchGiftListLocally(universe)(dispatch)
				.catch( e => {
					return fetchGiftListRemotely(universe)(dispatch);
				})
				.catch ( e => {
					console.log(`Failed fetching Gift-List for universe ${universe}`);
				})
		);
	}
}