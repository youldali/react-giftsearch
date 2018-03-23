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
const appendGiftList = (giftList: GiftCollection): Action => (
	{
		type: "GIFT_LIST_SEARCH/APPEND_TO_LIST",
		giftList
	}		
);


export
const fetchGiftListRemotely = (universe: string ) => async (dispatch: Dispatch): Promise<GiftCollection> => {
	const giftList = await giftFetcher(universe);
	dispatch(setGiftList(giftList));
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
const createFetchGistListWithWorker = () => {
	const giftListWorker = new Worker('worker.js');

	return (universe: string) => (dispatch: Dispatch, getState: Function): Promise<any> => {

		const dataForList = {
			filter: '',
			order: '',
			page: ''
		};
		giftListWorker.postMessage(dataForList);

		const successActionToDispatch = dataForList.page === 1 ? setGiftList : appendGiftList;
		return new Promise((resolve, reject) => {
			giftListWorker.onmessage = event => resolve(dispatch(successActionToDispatch(event.data)));
			giftListWorker.onerror = event => reject(dispatch(fetchGiftListSucceeds(false)));
		});
	};
};


export
const createFetchGiftListAction = () => 
window.Worker ? createFetchGistListWithWorker() : fetchGiftListRemotelyWithErrorhandling;
