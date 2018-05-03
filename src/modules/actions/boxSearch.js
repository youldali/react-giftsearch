 // @flow
import type { Action, BoxCollection, BoxCollectionRequestData, Dispatch, DisplayType, FiltersApplied, FiltersStatisticsByFilter, ThunkAction, WorkerResponseDataForBoxCollectionRequest} from './types';
 
import fetchBoxListService from '../boxSearch/services/fetchBoxListService';
import { handleErrorThunkAction } from 'helpers/promise/utils';
import { filtersAppliedSelectors, orderBySelectors, pageSelectors, routerSelectors } from '../boxSearch/index';
import { hasIndexedDB, hasWebWorker } from 'helpers/misc/featureDetection';
import { getFetchBoxListWebWorker } from '../boxSearch/services/webWorkers';
import { curry } from 'ramda';

export 
const setAppliedFilters = (filtersToApply: FiltersApplied) => (dispatch: Dispatch) : Action => {
	dispatch({
		type: "BOX_LIST_SEARCH/SET_APPLIED_FILTERS",
		filtersToApply
	});

	return dispatch(fetchBoxListAction);
};

export 
const resetAppliedFilters = (filtersToReset: Array<string>) => (dispatch: Dispatch): Action => {
	dispatch({
		type: "BOX_LIST_SEARCH/RESET_APPLIED_FILTERS",
		filtersToReset
	});

	return dispatch(fetchBoxListAction);
};


export 
const resetAllAppliedFilters = () => (dispatch: Dispatch): Action => {
	dispatch({
		type: "BOX_LIST_SEARCH/RESET_ALL_APPLIED_FILTERS",
	});

	return dispatch(fetchBoxListAction);
};


export 
const setOrderBy = (orderBy: string) => (dispatch: Dispatch): Action => {
	dispatch({
		type: "BOX_LIST_SEARCH/SET_ORDER_BY",
		orderBy
	});

	return dispatch(fetchBoxListAction);
};


export 
const setPage = (page: number) => (dispatch: Dispatch): Action => {
	dispatch({
		type: "BOX_LIST_SEARCH/SET_PAGE",
		page
	});

	return dispatch(fetchBoxListAction);
};


export 
const incrementPage = () => (dispatch: Dispatch): Action => {
	dispatch({
		type: "BOX_LIST_SEARCH/INCREMENT_PAGE",
	});

	return dispatch(fetchBoxListAction);
};


export 
const setDisplayBy = (displayBy: DisplayType): Action => (
	{
		type: "BOX_LIST_SEARCH/SET_DISPLAY_BY",
		displayBy
	}
);


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
		type: "BOX_LIST_SEARCH/HAS_FETCH_SUCCEEDED",
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
	const boxList = await fetchBoxListService(universe);
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


const getRequestData = (state: Object): BoxCollectionRequestData => (
	{
		universe: routerSelectors.getUniverse(state),
		filtersApplied: filtersAppliedSelectors.getAllAppliedFilters(state),
		orderBy: orderBySelectors.getOrderBy(state),
		page: pageSelectors.getPage(state)
	}
)

const _onWebWorkerResponse = (dispatch: Dispatch, requestData: BoxCollectionRequestData, responseData: WorkerResponseDataForBoxCollectionRequest) => {
	switch (responseData.type){
		case 'BOX_LIST':
			return requestData.page === 1 ? dispatch(setBoxList(responseData.boxList)) : dispatch(appendBoxList(responseData.boxList));
		case 'FILTERS_STATISTICS':
			return dispatch(setFiltersStatistics(responseData.filtersStatisticsByFilter));
	}
}
const onWebWorkerResponse = curry(_onWebWorkerResponse)


const fetchBoxListWithWorkerAction = (dispatch: Dispatch, getState: Function): Promise<any> => {
	const 
		boxListWorker = getFetchBoxListWebWorker(),
		requestData = getRequestData(getState()),
		onWebWorkerResponseWithDispatch = onWebWorkerResponse(dispatch, requestData);

	return new Promise(resolve => {
		boxListWorker.onmessage = event => resolve(onWebWorkerResponseWithDispatch(event.data))
		boxListWorker.onerror = event => resolve(dispatch(fetchBoxListSucceeds(false)));
		boxListWorker.postMessage(requestData);
	});
};


export
const fetchBoxListAction = (() => 
true ? fetchBoxListWithWorkerAction : tryFetchBoxListRemotely)();
