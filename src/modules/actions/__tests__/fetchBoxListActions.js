import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as actions from '../fetchBoxListActions';
import * as boxListFetcher from 'modules/boxSearch/services/fetchBoxListRemotely';
import { curry } from 'ramda';

const 
		middlewares = [thunk],
		mockStore = configureMockStore(middlewares),
		myBoxList = [
			{
				id: 100,
				name: 'adrenaline',
				price: 550
			},
			{
				id: 101,
				name: 'sejour in europe',
				price: 100
			},		
		];

let store;

beforeEach(() => {
	store = mockStore({
		boxSearch: {
			boxList: [],
			filtersApplied: {},
			orderBy: '',
			page: 1,
			displayBy: 'list'
		}
	});
});

describe('isFetchingBoxList', () => {
	test('it should return "BOX_LIST_SEARCH/FETCH_REQUESTED" action creator to true', () => {
		const expectedAction = {
			type: "BOX_LIST_SEARCH/FETCH_REQUESTED",
			isFetching: true
		};

		expect(actions.isFetchingBoxList(true)).toEqual(expectedAction);
	});
});


describe('setBoxList', () => {
	test('it should return "BOX_LIST_SEARCH/SET_LIST" action creator', () => {
		const expectedAction = {
			type: "BOX_LIST_SEARCH/SET_BOX_LIST",
			boxList: myBoxList
		};

		expect(actions.setBoxList(myBoxList)).toEqual(expectedAction);
	});
});


describe('fetchBoxListSucceeds', () => {
	test('it should return "BOX_LIST_SEARCH/FETCH_SUCCEEDED" action creator to true', () => {
		const expectedAction = {
			type: "BOX_LIST_SEARCH/FETCH_SUCCEEDED",
			success: true
		};

		expect(actions.fetchBoxListSucceeds(true)).toEqual(expectedAction);
	});
});


describe('appendBoxList', () => {
	test('it should return "BOX_LIST_SEARCH/FETCH_SUCCEEDED" action creator to true', () => {
		const expectedAction = {
			type: "BOX_LIST_SEARCH/APPEND_TO_BOX_LIST",
			boxList: myBoxList
		};

		expect(actions.appendBoxList(myBoxList)).toEqual(expectedAction);
	});
});


describe('setFiltersStatistics', () => {
	test('it should return "BOX_LIST_SEARCH/SET_FILTERS_STATISTICS" action creator to true', () => {
		const filtersStatisticsByFilter = {
			'price1': 100,
			'price2': 32
		};	

		const expectedAction = {
			type: "BOX_LIST_SEARCH/SET_FILTERS_STATISTICS",
			filtersStatisticsByFilter: filtersStatisticsByFilter
		};

		expect(actions.setFiltersStatistics(filtersStatisticsByFilter)).toEqual(expectedAction);
	});
});


describe('tryFetchBoxListRemotely', () => {
	const myBoxList_1 = [
		{id: 100, name: 'adrenaline', price: 550},
		{id: 101, name: 'sejour in europe', price: 100},		
	];
	const myBoxList_2 = [
		{id: 100, name: 'Paris', price: 300},
		{id: 101, name: 'London', price: 400},		
	];

	const _mockBoxListFetcher = (boxList, willResolve, universe) => 
		new Promise( (resolve, reject) => willResolve ? resolve(boxList) : reject('Error') );
	const mockBoxListFetcher = curry(_mockBoxListFetcher);

	test('it succeeds', () => {
		jest.spyOn(boxListFetcher, 'default').mockImplementation(mockBoxListFetcher(myBoxList_1, true));

		//expected actions
		const expectedActions = [
			{ type: "BOX_LIST_SEARCH/SET_BOX_LIST", boxList: myBoxList_1 }
		];

		return (
			store.dispatch(actions.tryFetchBoxListRemotely('gastronomy'))
				.then(() => {
					const actions = store.getActions()
					expect(actions).toEqual(expectedActions);
				})
		);
	});

	test('it fails', () => {
		jest.spyOn(boxListFetcher, 'default').mockImplementation(mockBoxListFetcher(myBoxList_1, true));

		//expected actions
		const expectedActions = [
			{ type: "BOX_LIST_SEARCH/FETCH_REQUESTED", isFetching: true },
			{ type: "BOX_LIST_SEARCH/FETCH_SUCCEEDED", success: false },
		];

		return (
			store.dispatch(actions.tryFetchBoxListRemotely('gastronomy'))
			.then( () => {
				const actions = store.getActions()
				expect(actions).toEqual(expectedActions);
			})
			.catch(() => {})
		);
	});
});


describe('createFetchBoxListWithWorkerAction', () => {

	const createWebWorkerMock = (throwError, responseData) => 
		class{
			postMessage(requestData) {
				throwError ? this.onerror('error') : this.onmessage(responseData);
			}
			onmessage() {}
			onerror() {}
		};

	test('get the box list though the web worker', () => {
		const responseData = {
			data: {
				type: 'BOX_LIST',
				boxList: myBoxList
			}
		}

		global.Worker = createWebWorkerMock(false, responseData);
		const fetchBoxListWithWorkerAction = actions.createFetchBoxListWithWorkerAction();

		const expectedActions = [
			{ type: "BOX_LIST_SEARCH/SET_BOX_LIST", boxList: myBoxList },
		];

		return (
			store.dispatch(fetchBoxListWithWorkerAction('gastronomy'))
			.then( () => {
				const actions = store.getActions();
				expect(actions).toEqual(expectedActions);
			})
		);

	});

	test('get the filters statistics though the web worker', () => {
		const responseData = {
			data: {
				type: 'FILTERS_STATISTICS',
				filtersStatisticsByFilter: {
					'price1': 19,
					'forOnePerson': 22
				}
			}
		}

		global.Worker = createWebWorkerMock(false, responseData);
		const fetchBoxListWithWorkerAction = actions.createFetchBoxListWithWorkerAction();

		const expectedActions = [
			{ type: "BOX_LIST_SEARCH/SET_FILTERS_STATISTICS", filtersStatisticsByFilter: responseData.data.filtersStatisticsByFilter },
		];

		return (
			store.dispatch(fetchBoxListWithWorkerAction('gastronomy'))
			.then( () => {
				const actions = store.getActions();
				expect(actions).toEqual(expectedActions);
			})
		);

	});

	test('web worker throws an error', () => {
		const responseData = {}

		global.Worker = createWebWorkerMock(true, responseData);
		const fetchBoxListWithWorkerAction = actions.createFetchBoxListWithWorkerAction();

		const expectedActions = [
			{ type: "BOX_LIST_SEARCH/FETCH_SUCCEEDED", success: false },
		];

		return (
			store.dispatch(fetchBoxListWithWorkerAction('gastronomy'))
			.then( () => {
				const actions = store.getActions();
				expect(actions).toEqual(expectedActions);
			})
		);

	});
});