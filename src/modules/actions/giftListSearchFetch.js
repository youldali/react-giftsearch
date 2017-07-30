 // @flow
import type { Action, GiftCollection, Dispatch, ThunkAction } from './types';
import giftFetcher from '../gift-search/helpers/fetchGiftsRemotely';
import { getFromStorage, saveToStorage } from 'helpers/browser-storage/storage';

export
function isFetchingGiftList(isFetching: boolean): Action{
	return{
		type: "GIFT_LIST_SEARCH/FETCH_REQUESTED",
		isFetching
	}	
}

export
function fetchGiftListSucceeds(success: boolean): Action{
	return{
		type: "GIFT_LIST_SEARCH/FETCH_SUCCEEDED",
		success
	}	
}

export
function setGiftList(giftList: GiftCollection): Action{
return{
		type: "GIFT_LIST_SEARCH/SET_LIST",
		giftList
	}		
}

export
function fetchGiftListRemotely (universe: string ): Function{
	return (dispatch: Dispatch): Promise<GiftCollection> => {
		dispatch(isFetchingGiftList(true));
		
		return (
			giftFetcher(universe)
				.catch( e => {
					dispatch(fetchGiftListSucceeds(false))
					return Promise.reject(e);
				})
				.then( giftList => {
					dispatch(fetchGiftListSucceeds(true))
					dispatch(setGiftList(giftList));
					saveToStorage(universe, giftList)
						.catch(e => console.log('Error saving Gift List', e));
					return giftList;
				})
		);
	};
}

export
function fetchGiftListLocally (universe: string ): Function{
	return (dispatch: Dispatch): Promise<GiftCollection> => {		
		return (
			getFromStorage(universe)
				.then( giftList => {
					dispatch(setGiftList(giftList));
					return giftList;
				})
		);
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