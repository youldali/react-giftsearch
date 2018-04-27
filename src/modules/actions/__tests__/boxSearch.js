import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as actions from '../boxSearch';
import * as boxListFetcher from 'modules/boxSearch/services/fetchBoxListRemotely';
import * as featureDetection from 'helpers/misc/featureDetection';
import { curry } from 'ramda';

jest.mock('../../boxSearch/services/webWorkers');

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
			displayBy: 'list',
			filtersApplied: {},
			orderBy: '',
			page: 1,
			router: {universe: 'sejour'}
		}
	});

	jest.spyOn(featureDetection, 'hasIndexedDB').mockReturnValue(true);
	jest.spyOn(featureDetection, 'hasWebWorker').mockReturnValue(true);

	const responseData = {
		data: {
			type: 'BOX_LIST',
			boxList: myBoxList
		}
	};
});

describe.only('setAppliedFilters', () => {
	test.only('it should return the "set filter" action creator with no related field to erase for filter: name', () => {

		const expectedActions = [
			{
				type: "BOX_LIST_SEARCH/SET_APPLIED_FILTERS",
				filtersApplied: {'name': 'jean'},
			},
			{
				type: "BOX_LIST_SEARCH/SET_BOX_LIST",
				boxList: myBoxList,
			}
		];


		store.dispatch(actions.setAppliedFilters({'name': 'jean'}))
			.then( () => {
				const actions = store.getActions();
				expect(actions).toEqual(expectedActions);
			})
	});

	test('it should return the "set filter" action creator with no related field to erase for filter: maxPrice', () => {
		const expectedAction = {
			type: "BOX_LIST_SEARCH/SET_APPLIED_FILTERS",
			filtersApplied: {
				'maxPrice': 300
			}
		};

		expect(actions.setAppliedFilters({'maxPrice': 300})).toEqual(expectedAction);
	});
});


describe('resetAppliedFilters', () => {
	test('it should return the "reset filter" action creator', () => {
		const expectedAction = {
			type: "BOX_LIST_SEARCH/RESET_APPLIED_FILTERS",
			filtersAppliedToReset: ['prenom', 'nom'],
		};

		expect(actions.resetAppliedFilters(['prenom', 'nom'])).toEqual(expectedAction);
	});
});


describe('resetAllAppliedFilters', () => {
	test('it should return the "reset all filters" action creator', () => {
		const expectedAction = {
			type: "BOX_LIST_SEARCH/RESET_ALL_APPLIED_FILTERS",
		};

		expect(actions.resetAllAppliedFilters()).toEqual(expectedAction);
	});
});


describe('setPage', () => {
	test('it should return the "set page" action creator', () => {
		const expectedAction = {
			type: "BOX_LIST_SEARCH/SET_PAGE",
			page: 3,
		};

		expect(actions.setPage(3)).toEqual(expectedAction);
	});
});


describe('incrementPage', () => {
	test('it should return the "increment page" action creator', () => {
		const expectedAction = {
			type: "BOX_LIST_SEARCH/INCREMENT_PAGE",
		};

		expect(actions.incrementPage()).toEqual(expectedAction);
	});
});


describe('decrementPage', () => {
	test('it should return the "decrement page" action creator', () => {
		const expectedAction = {
			type: "BOX_LIST_SEARCH/DECREMENT_PAGE",
		};

		expect(actions.decrementPage()).toEqual(expectedAction);
	});
});


describe('setDisplay', () => {
	test('it should return the "set display" action creator', () => {
		const expectedAction = {
			type: "BOX_LIST_SEARCH/SET_DISPLAY_BY",
			displayBy: 'card',
		};

		expect(actions.setDisplayBy('card')).toEqual(expectedAction);
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