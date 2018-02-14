import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as actions from '../giftListSearchFetch';
import * as giftFetcherRemote from 'modules/gift-search/helpers/fetchGiftsRemotely';
import * as giftFetchLocal from 'helpers/browser-storage/localForage';

describe('Plain actions creators', () => {

	test('it should return "GIFT_LIST_SEARCH/FETCH_REQUESTED" action creator', () => {
		const expectedAction = {
			type: "GIFT_LIST_SEARCH/FETCH_REQUESTED",
			isFetching: true
		};

		expect(actions.isFetchingGiftList(true)).toEqual(expectedAction);
	});

	test('it should return "GIFT_LIST_SEARCH/FETCH_SUCCEEDED" action creator', () => {
		const expectedAction = {
			type: "GIFT_LIST_SEARCH/FETCH_SUCCEEDED",
			success: false
		};

		expect(actions.fetchGiftListSucceeds(false)).toEqual(expectedAction);
	});

	test('it should return "GIFT_LIST_SEARCH/SET_LIST" action creator', () => {
		const myGiftList = [
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

		const expectedAction = {
			type: "GIFT_LIST_SEARCH/SET_LIST",
			giftList: myGiftList
		};

		expect(actions.setGiftList(myGiftList)).toEqual(expectedAction);
	});

});


describe('thunks', () => {

	const middlewares = [thunk]; // add your middlewares like `redux-thunk`
	const mockStore = configureMockStore(middlewares);
	let store;

	//mocks
	const myGiftList_1 = [
		{id: 100, name: 'adrenaline', price: 550},
		{id: 101, name: 'sejour in europe', price: 100},		
	];
	const myGiftList_2 = [
		{id: 100, name: 'Paris', price: 300},
		{id: 101, name: 'London', price: 400},		
	];
	const mockGiftFetcherRemote = (universe) => {
		return new Promise( (resolve, reject) => {
			if(universe === 'gastronomy')
				resolve(myGiftList_1);
			else
				reject('Error');
		});
	}

	const mockGiftFetcherLocal = (universe) => {
		return new Promise( (resolve, reject) => {
			if(universe === 'sejour')
				resolve(myGiftList_2);
			else
				reject('Error');
		});
	}

	const mockGiftSaveLocal = (succeeds) => {
		return new Promise( (resolve, reject) => {
			if(succeeds)
				resolve('');
			else
				reject('Error');
		});
	}

	let spyStorageSaveGifts;
	beforeAll(() => {
		jest.spyOn(giftFetcherRemote, 'default').mockImplementation( universe => mockGiftFetcherRemote(universe));
		jest.spyOn(giftFetchLocal, 'getFromStorage').mockImplementation( universe => mockGiftFetcherLocal(universe));
		spyStorageSaveGifts = jest.spyOn(giftFetchLocal, 'saveToStorage').mockImplementation( succeeds => mockGiftSaveLocal(succeeds));
	});
	

	beforeEach(() => {
		//reinit store
		store = mockStore({});
	});


	describe('fetchGiftListRemotely', () => {

		test('it succeeds', () => {
			//expected actions
			const expectedActions = [
				{ type: "GIFT_LIST_SEARCH/FETCH_SUCCEEDED", success: true },
				{ type: "GIFT_LIST_SEARCH/SET_LIST", giftList: myGiftList_1 }
			];

			return (
				store.dispatch(actions.fetchGiftListRemotely('gastronomy'))
					.then(() => {
						const actions = store.getActions()
						expect(actions).toEqual(expectedActions);
						expect(spyStorageSaveGifts).toHaveBeenCalled();
					})
			);
		});

		test('it fails', () => {
			//expected actions
			const expectedActions = [
				{ type: "GIFT_LIST_SEARCH/FETCH_REQUESTED", isFetching: true },
				{ type: "GIFT_LIST_SEARCH/FETCH_SUCCEEDED", success: false },
			];

			return (
				store.dispatch(actions.handleErrorFetchGiftListRemotely)('error')
				.then( () => {
					const actions = store.getActions()
					expect(actions).toEqual(expectedActions);
				})
				.catch(() => {})
			);
		});

	});

	describe('fetchGiftListLocally', () => {

		test('it succeeds', () => {
			//expected actions
			const expectedActions = [
				{ type: "GIFT_LIST_SEARCH/SET_LIST", giftList: myGiftList_2 }
			];

			return (
				store.dispatch(actions.fetchGiftListLocally('sejour'))
					.then(() => {
						const actions = store.getActions()
		      	expect(actions).toEqual(expectedActions);
					})
			);
		});

		test('it fails', () => {
			//expected actions
			const expectedActions = [];

			return (
				store.dispatch(actions.fetchGiftListLocally('undefined'))
					.catch(() => {
						const actions = store.getActions()
		      	expect(actions).toEqual(expectedActions);
					})
			);
		});

	});

	describe('fetchGiftList', () => {

		test('it success locally', function(){

			//expected actions
			const expectedActions = [
				{ type: "GIFT_LIST_SEARCH/FETCH_REQUESTED", isFetching: true },
				{ type: "GIFT_LIST_SEARCH/SET_LIST", giftList: myGiftList_2 },
				{ type: "GIFT_LIST_SEARCH/FETCH_REQUESTED", isFetching: false }
	    	];

			store.dispatch(actions.fetchGiftList('sejour'))
				.then(() => {
					const actions = store.getActions()
	      			expect(actions).toEqual(expectedActions);
				});
		});

		test('it fails locally THEN succeeds remotely', function(){

			//expected actions
			const expectedActions = [
				{ type: "GIFT_LIST_SEARCH/FETCH_REQUESTED", isFetching: true },
				{ type: "GIFT_LIST_SEARCH/FETCH_SUCCEEDED", success: true },
				{ type: "GIFT_LIST_SEARCH/SET_LIST", giftList: myGiftList_1 },
				{ type: "GIFT_LIST_SEARCH/FETCH_REQUESTED", isFetching: false }
			];

			store.dispatch(actions.fetchGiftList('gastronomy'))
				.then(() => {
					const actions = store.getActions()
	      			expect(actions).toEqual(expectedActions);
				});
		});

		test('it fails locally THEN fails remotely', function(){

			//expected actions
			const expectedActions = [
				{ type: "GIFT_LIST_SEARCH/FETCH_REQUESTED", isFetching: true },
				{ type: "GIFT_LIST_SEARCH/FETCH_SUCCEEDED", success: false },
				{ type: "GIFT_LIST_SEARCH/FETCH_REQUESTED", isFetching: false }
	    	];

			store.dispatch(actions.fetchGiftList('undefined'))
				.catch(() => {
					const actions = store.getActions()
	      			expect(actions).toEqual(expectedActions);
				});
		});

	});
	
});