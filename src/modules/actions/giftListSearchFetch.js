 // @flow
import type { Action, BoxCollection, Dispatch, ThunkAction } from './types';
import boxFetcher from '../boxSearch/services/fetchBoxesRemotely';
import { handleErrorThunkAction } from 'helpers/promise/utils';
import { orderBySelectors, selectedFiltersSelectors, pageSelectors } from '../boxSearch/index';
import { hasWebWorker, hasIndexedDB } from 'helpers/misc/featureDetection';

export
const isFetchingboxList = (isFetching: boolean): Action => (
	{
		type: "BOX_LIST_SEARCH/FETCH_REQUESTED",
		isFetching
	}
);

export
const fetchboxListSucceeds = (success: boolean): Action => (
	{
		type: "BOX_LIST_SEARCH/FETCH_SUCCEEDED",
		success
	}	
);

export
const setBoxList = (boxList: BoxCollection): Action => (
	{
		type: "BOX_LIST_SEARCH/SET_LIST",
		boxList
	}		
);

export
const appendBoxList = (boxList: BoxCollection): Action => (
	{
		type: "BOX_LIST_SEARCH/APPEND_TO_LIST",
		boxList
	}		
);


export
const fetchBoxListRemotely = (universe: string ) => async (dispatch: Dispatch): Promise<BoxCollection> => {
	const boxList = await boxFetcher(universe);
	dispatch(setBoxList(boxList));
	return boxList;
};

export
const handleErrorFetchBoxListRemotely = (dispatch: Dispatch) => (error: Object): Promise<Object> => {
	console.log('Error saving box List', error.toString());
	dispatch(fetchboxListSucceeds(false));
	return Promise.reject(error);
};

export const fetchBoxListRemotelyWithErrorhandling = handleErrorThunkAction(handleErrorFetchBoxListRemotely)(fetchBoxListRemotely);

export
const createFetchGistListWithWorker = () => {
	const boxListWorker = new Worker('worker.js');

	return (universe: string) => (dispatch: Dispatch, getState: Function) => {
		const 
			state = getState(),
			requestData = {
				universe,
				filtersSelected: selectedFiltersSelectors.getAllSelectedFilters(state),
				orderBy: orderBySelectors.getOrderBy(state),
				page: pageSelectors.getPage(state)
			};

		boxListWorker.postMessage(requestData);

		boxListWorker.onmessage = event => {
			const {action, data} = event.data;
			switch (action){
				case 'SET_BOX_LIST':
					return dispatch(setBoxList(data));
				case 'APPEND_BOX_LIST':
					return dispatch(appendBoxList(data));
				case 'FILTER_STATISTIC':
					return dispatch(setFiltersStatistics(data));
			}
		};
		boxListWorker.onerror = event => dispatch(fetchboxListSucceeds(false));
	};
};


export
const createFetchboxListAction = () => 
hasWebWorker && hasIndexedDB ? createFetchGistListWithWorker() : fetchBoxListRemotelyWithErrorhandling;
