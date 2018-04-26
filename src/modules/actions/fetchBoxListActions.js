 // @flow
import type { Action, BoxCollection, BoxCollectionRequestData, Dispatch, FiltersStatisticsByFilter, ThunkAction, WorkerBoxCollectionResponseData} from './types';

import boxFetcher from '../boxSearch/services/fetchBoxListRemotely';
import { handleErrorThunkAction } from 'helpers/promise/utils';
import { filtersAppliedSelectors, orderBySelectors, pageSelectors } from '../boxSearch/index';
import { hasIndexedDB, hasWebWorker } from 'helpers/misc/featureDetection';
import { curry } from 'ramda';

export
const isFetchingBoxList = (isFetching: boolean): Action => (
	{
		type: "BOX_LIST_SEARCH/FETCH_REQUESTED",
		isFetching
	}
);

export
const fetchBoxListSucceeds = (success: boolean): Action => (
	{
		type: "BOX_LIST_SEARCH/FETCH_SUCCEEDED",
		success
	}	
);

export
const setBoxList = (boxList: BoxCollection): Action => (
	{
		type: "BOX_LIST_SEARCH/SET_BOX_LIST",
		boxList
	}		
);

export
const appendBoxList = (boxList: BoxCollection): Action => (
	{
		type: "BOX_LIST_SEARCH/APPEND_TO_BOX_LIST",
		boxList
	}		
);


export
const setFiltersStatistics = (filtersStatisticsByFilter: FiltersStatisticsByFilter): Action => (
	{
		type: "BOX_LIST_SEARCH/SET_FILTERS_STATISTICS",
		filtersStatisticsByFilter
	}	
);


const _fetchBoxListRemotely = async (universe: string, dispatch: Dispatch): Promise<BoxCollection> => {
	const boxList = await boxFetcher(universe);
	dispatch(setBoxList(boxList));
	return boxList;
};
const fetchBoxListRemotely = curry(_fetchBoxListRemotely)


const _handleErrorFetchBoxListRemotely = (dispatch: Dispatch, error: Object): Promise<Object> => {
	console.log('Error saving box List', error.toString());
	dispatch(fetchBoxListSucceeds(false));
	return Promise.reject(error);
};
const handleErrorFetchBoxListRemotely = curry(_handleErrorFetchBoxListRemotely)


export const tryFetchBoxListRemotely = handleErrorThunkAction(handleErrorFetchBoxListRemotely)(fetchBoxListRemotely);



export
const createFetchBoxListWithWorkerAction = () => {
	const boxListWorker = new Worker('worker.js');

	const _onWebWorkerResponse = (dispatch: Dispatch, requestData: BoxCollectionRequestData, responseData: WorkerBoxCollectionResponseData) => {
		switch (responseData.type){
			case 'BOX_LIST':
				return requestData.page === 1 ? dispatch(setBoxList(responseData.boxList)) : dispatch(appendBoxList(responseData.boxList));
			case 'FILTERS_STATISTICS':
				return dispatch(setFiltersStatistics(responseData.filtersStatisticsByFilter));
		}
	}
	const onWebWorkerResponse = curry(_onWebWorkerResponse)

	return (universe: string) => (dispatch: Dispatch, getState: Function): Promise<any> => {
		const 
			state = getState(),
			requestData: BoxCollectionRequestData = {
				universe,
				filtersApplied: filtersAppliedSelectors.getAllAppliedFilters(state),
				orderBy: orderBySelectors.getOrderBy(state),
				page: pageSelectors.getPage(state)
			},
			onWebWorkerResponseWithDispatch = onWebWorkerResponse(dispatch, requestData);

		return new Promise(resolve => {
			boxListWorker.onmessage = event => resolve(onWebWorkerResponseWithDispatch(event.data))
			boxListWorker.onerror = event => resolve(dispatch(fetchBoxListSucceeds(false)));
			boxListWorker.postMessage(requestData);
		});

	};
};


export
const createFetchBoxListAction = () => 
hasWebWorker && hasIndexedDB ? createFetchBoxListWithWorkerAction() : tryFetchBoxListRemotely;
