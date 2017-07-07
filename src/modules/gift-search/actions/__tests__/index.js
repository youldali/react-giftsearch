import * as actions from '../index';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as giftFetcher from '../../helper/fetchGiftsRemotely';

test('it should return the "set filter" action creator', function(){
	const expectedAction = {
		type: "SET_FILTER",
		filters: {
			'name': 'jean'
		}
	};

	expect(actions.setFilter({'name': 'jean'})).toEqual(expectedAction);
})

test('it should return the "reset filter" action creator', function(){
	const expectedAction = {
		type: "RESET_FILTER",
		filters: ['prenom'],
	};

	expect(actions.resetFilter(['prenom'])).toEqual(expectedAction);
})

test('it should return the "set order" action creator', function(){
	const expectedAction = {
		type: "SET_ORDER",
		order: 'nom',
	};

	expect(actions.setOrder('nom')).toEqual(expectedAction);
})

test('it should return the "set universe" action creator', function(){
	const expectedAction = {
		type: "SET_UNIVERSE",
		universe: 'sejour',
	};

	expect(actions.setUniverse('sejour')).toEqual(expectedAction);
})

describe('fetch Gift List', () => {
	const middlewares = [thunk]; // add your middlewares like `redux-thunk`
	const mockStore = configureMockStore(middlewares);
	let store;

	beforeEach(() => {
		//reinit store
		store = mockStore({});
	});

	test('it should dispatch the correct action creators with the gift List', function(){
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

		//mock the request to fetch gift
		giftFetcher.default = jest.fn( universe => {
			return new Promise ( (resolve, reject) => {
				resolve(myGiftList);
			});
		});

		//expected actions
		const expectedActions = [
      { type: "IS_FETCHING_GIFT_LIST", isFetching: true },
      { type: "IS_FETCHING_GIFT_LIST", isFetching: false },
      { type: "SET_GIFT_LIST", giftList: myGiftList }
    ];

		store.dispatch(actions.fetchGiftList('sejour'))
			.then(() => {
				const actions = store.getActions()
      	expect(actions).toEqual(expectedActions);
			});
	});

test('it should dispatch the correct action creators with the gift List undefined', function(){

		//mock the request to fetch gift
		giftFetcher.default = jest.fn( universe => {
			return new Promise ( (resolve, reject) => {
				resolve(undefined);
			});
		});

		//expected actions
		const expectedActions = [
      { type: "IS_FETCHING_GIFT_LIST", isFetching: true },
      { type: "IS_FETCHING_GIFT_LIST", isFetching: false },
      { type: "SET_GIFT_LIST", giftList: undefined }
    ];

		store.dispatch(actions.fetchGiftList('sejour'))
			.then(() => {
				const actions = store.getActions()
      	expect(actions).toEqual(expectedActions);
			});
	});	

})