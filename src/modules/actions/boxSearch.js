 // @flow
import type { Action, BoxCollection, BoxCollectionRequestData, Dispatch, DisplayType, FiltersAppliedState, FiltersStatisticsByFilter, ThunkAction, WorkerResponseDataForBoxCollectionRequest} from './types';
 
import boxFetcher from '../boxSearch/services/fetchBoxListRemotely';
import { handleErrorThunkAction } from 'helpers/promise/utils';
import { filtersAppliedSelectors, orderBySelectors, pageSelectors, routerSelectors } from '../boxSearch/index';
import { hasIndexedDB, hasWebWorker } from 'helpers/misc/featureDetection';
import { getFetchBoxListWebWorker } from '../boxSearch/services/webWorkers';
import { curry } from 'ramda';

export 
const setAppliedFilters = (filtersApplied: FiltersAppliedState) => (dispatch: Dispatch) : Action => {
	dispatch({
		type: "BOX_LIST_SEARCH/SET_APPLIED_FILTERS",
		filtersApplied
	});

	return dispatch(fetchBoxListAction);
};

export 
const resetAppliedFilters = (filtersAppliedToReset: Array<string>): Action => (
	{
		type: "BOX_LIST_SEARCH/RESET_APPLIED_FILTERS",
		filtersAppliedToReset
	}
);

export 
const resetAllAppliedFilters = (): Action => (
	{
		type: "BOX_LIST_SEARCH/RESET_ALL_APPLIED_FILTERS",
	}
);

export 
const setOrder = (orderBy: string): Action => (
	{
		type: "BOX_LIST_SEARCH/SET_ORDER_BY",
		orderBy
	}
);

export 
const setPage = (page: number): Action => (
	{
		type: "BOX_LIST_SEARCH/SET_PAGE",
		page
	}
);

export 
const incrementPage = (): Action => (
	{
		type: "BOX_LIST_SEARCH/INCREMENT_PAGE",
	}
);

export 
const decrementPage = (): Action => (
	{
		type: "BOX_LIST_SEARCH/DECREMENT_PAGE",
	}
);

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

export
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
