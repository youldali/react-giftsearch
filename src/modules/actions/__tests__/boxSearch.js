import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as actions from '../boxSearch';
import * as boxListFetcher from 'modules/boxSearch/services/fetchBoxListRemotely';
import * as featureDetection from 'helpers/misc/featureDetection';
import { curry } from 'ramda';
import { myBoxList } from '../../boxSearch/services/__mocks__/webWorkers';
import rootReducer from '../../rootReducer';

jest.mock('../../boxSearch/services/webWorkers');

const 
	middlewares = [thunk],
	mockStore = configureMockStore(middlewares);

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

	store.replaceReducer(rootReducer);
	
	jest.spyOn(featureDetection, 'hasIndexedDB').mockReturnValue(true);
	jest.spyOn(featureDetection, 'hasWebWorker').mockReturnValue(true);
});

describe('setAppliedFilters', () => {
	test('it should set the new filter and fetch the box list (1)', () => {

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

	test('it should set the new filter and fetch the box list (2)', () => {
		const expectedActions = [
			{
				type: "BOX_LIST_SEARCH/SET_APPLIED_FILTERS",
				filtersApplied: {'maxPrice': 300},
			},
			{
				type: "BOX_LIST_SEARCH/SET_BOX_LIST",
				boxList: myBoxList,
			}
		];

		store.dispatch(actions.setAppliedFilters({'maxPrice': 300}))
			.then( () => {
				const actions = store.getActions();
				expect(actions).toEqual(expectedActions);
			})
	});
});


describe('resetAppliedFilters', () => {
	test('it should reset the filters passed and fetch the box list', () => {
		const expectedActions = [
			{
				type: "BOX_LIST_SEARCH/RESET_APPLIED_FILTERS",
				filtersAppliedToReset: ['prenom', 'nom'],
			},
			{
				type: "BOX_LIST_SEARCH/SET_BOX_LIST",
				boxList: myBoxList,
			}
		];

		store.dispatch(actions.resetAppliedFilters(['prenom', 'nom']))
			.then( () => {
				const actions = store.getActions();
				expect(actions).toEqual(expectedActions);
			});
	});
});


describe('resetAllAppliedFilters', () => {
	test('it should reset all filters and fetch the box list', () => {
		const expectedActions = [
			{
				type: "BOX_LIST_SEARCH/RESET_ALL_APPLIED_FILTERS",
			},
			{
				type: "BOX_LIST_SEARCH/SET_BOX_LIST",
				boxList: myBoxList,
			}
		];

		store.dispatch(actions.resetAllAppliedFilters())
			.then( () => {
				const actions = store.getActions();
				expect(actions).toEqual(expectedActions);
			});
	});
});


describe('setOrderBy', () => {
	test('it should set the new order and fetch the box list', () => {
		const expectedActions = [
			{
				type: "BOX_LIST_SEARCH/SET_ORDER_BY",
				orderBy: 'price'
			},
			{
				type: "BOX_LIST_SEARCH/SET_BOX_LIST",
				boxList: myBoxList,
			}
		];

		store.dispatch(actions.setOrderBy('price'))
			.then( () => {
				const actions = store.getActions();
				expect(actions).toEqual(expectedActions);
			});
	});
});


describe('setPage', () => {
	test('it should set the new page and set the box list', () => {
		const expectedActions = [
			{
				type: "BOX_LIST_SEARCH/SET_PAGE",
				page: 3,
			},
			{
				type: "BOX_LIST_SEARCH/SET_BOX_LIST",
				boxList: myBoxList,
			}
		];

		store.dispatch(actions.setPage(3))
			.then( () => {
				const actions = store.getActions();
				expect(actions).toEqual(expectedActions);
			});
	});
});


describe('incrementPage', () => {

	beforeEach(() => {
		store = mockStore({
			boxSearch: {
				boxList: [],
				displayBy: 'list',
				filtersApplied: {},
				orderBy: '',
				page: 2,
				router: {universe: 'sejour'}
			}
		});
	});

	test('it should increment the page and append the box list', () => {
		const expectedActions = [
			{
				type: "BOX_LIST_SEARCH/INCREMENT_PAGE",
			},
			{
				type: "BOX_LIST_SEARCH/APPEND_TO_BOX_LIST",
				boxList: myBoxList,
			}
		];

		store.dispatch(actions.incrementPage())
			.then( () => {
				const actions = store.getActions();
				expect(actions).toEqual(expectedActions);
			});
	});
});


describe('setDisplayBy', () => {
	test('it should return the "set display by" action creator', () => {
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



describe('fetchBoxListSucceeds', () => {
	test('it should return "BOX_LIST_SEARCH/HAS_FETCH_SUCCEEDED" action creator to true', () => {
		const expectedAction = {
			type: "BOX_LIST_SEARCH/HAS_FETCH_SUCCEEDED",
			success: true
		};

		expect(actions.fetchBoxListSucceeds(true)).toEqual(expectedAction);
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


/*
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
*/
