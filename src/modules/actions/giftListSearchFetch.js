 // @flow
import type { Action, GiftCollection, Dispatch, ThunkAction } from './types';
import giftFetcher from '../gift-search/helpers/fetchGiftsRemotely';
import { handleErrorThunkAction } from 'helpers/promise/utils';

export
const isFetchingGiftList = (isFetching: boolean): Action => (
	{
		type: "GIFT_LIST_SEARCH/FETCH_REQUESTED",
		isFetching
	}
);

export
const fetchGiftListSucceeds = (success: boolean): Action => (
	{
		type: "GIFT_LIST_SEARCH/FETCH_SUCCEEDED",
		success
	}	
);

export
const setGiftList = (giftList: GiftCollection): Action => (
	{
		type: "GIFT_LIST_SEARCH/SET_LIST",
		giftList
	}		
);

export
const fetchGiftListRemotely = (universe: string ) => async (dispatch: Dispatch): Promise<GiftCollection> => {
	const giftList = await giftFetcher(universe);
	dispatch(fetchGiftListSucceeds(true));
	dispatch(setGiftList(giftList));
	saveToStorage(universe, giftList)
		.catch(e => console.log('Error saving Gift List', e));
	
	return giftList;
};

export
const handleErrorFetchGiftListRemotely = (dispatch: Dispatch) => (error: Object): Promise<Object> => {
	console.log('Error saving Gift List', error.toString());
	dispatch(fetchGiftListSucceeds(false));
	return Promise.reject(error);
};

export const fetchGiftListRemotelyWithErrorhandling = handleErrorThunkAction(handleErrorFetchGiftListRemotely)(fetchGiftListRemotely);

export
const fetchGiftListLocally = (universe: string ) => async (dispatch: Dispatch): Promise<GiftCollection> => {		
	const giftList = await getFromStorage(universe);
	dispatch(setGiftList(giftList));
	return giftList;
};


export 
const fetchGiftList = (universe: string) => (dispatch: Dispatch): Promise<any> => {
	dispatch(isFetchingGiftList(true));
	return	(
		fetchGiftListLocally(universe)(dispatch)
			.catch( e => {
				return fetchGiftListRemotelyWithErrorhandling(universe)(dispatch);
			})
			.catch ( e => {
				console.log(`Failed fetching Gift-List for universe ${universe}`);
			})
			.then(() => dispatch(isFetchingGiftList(false)) )
	);
};
