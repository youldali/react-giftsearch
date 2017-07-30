import * as actions from '../giftListSearchSorting';
import * as giftSearchConfig from 'modules/gift-search/config';

giftSearchConfig.filterConfig = {
	'forOneNight': {
		filterGroup: 'nights' 
	},
	'forMultipleNights': {
		filterGroup: 'nights' 
	},
	'maxPrice': {
	},
	'forPersonsRange': {
		filterGroup: 'person' 
	},
	'forPersons': {
		filterGroup: 'person'
	},
};

describe('setFilters', () => {

	test('it should return the "set filter" action creator with no related field to erase for filter: name', () => {
		const expectedAction = {
			type: "GIFT_LIST_SEARCH/SET_FILTERS",
			filters: {
				'name': 'jean'
			},
			filtersToReset: []
		};

		expect(actions.setFilters({'name': 'jean'})).toEqual(expectedAction);
	});

	test('it should return the "set filter" action creator with no related field to erase for filter: maxPrice', () => {
		const expectedAction = {
			type: "GIFT_LIST_SEARCH/SET_FILTERS",
			filters: {
				'maxPrice': 300
			},
			filtersToReset: []
		};

		expect(actions.setFilters({'maxPrice': 300})).toEqual(expectedAction);
	});

	test('it should return the "set filter" action creator with related fields to erase for multiple filters  ', () => {
		const expectedAction = {
			type: "GIFT_LIST_SEARCH/SET_FILTERS",
			filters: {
				'forPersonsRange': 3,
				'forOneNight': 1,
				'maxPrice': 300
			},
			filtersToReset: ['forPersons', 'forMultipleNights']
		};

		expect(actions.setFilters({'forPersonsRange': 3, 'forOneNight': 1, 'maxPrice': 300})).toEqual(expectedAction);
	});

});

describe('resetFilters', () => {

	test('it should return the "reset filter" action creator', () => {
		const expectedAction = {
			type: "GIFT_LIST_SEARCH/RESET_FILTERS",
			filtersToReset: ['prenom', 'nom'],
		};

		expect(actions.resetFilters(['prenom', 'nom'])).toEqual(expectedAction);
	});

});


describe('resetFilters', () => {

	test('it should return the "set order" action creator', () => {
		const expectedAction = {
			type: "GIFT_LIST_SEARCH/SET_ORDER",
			order: 'nom',
		};

		expect(actions.setOrder('nom')).toEqual(expectedAction);
	});

});

describe('setUniverse', () => {

	test('it should return the "set universe" action creator', () => {
		const expectedAction = {
			type: "GIFT_LIST_SEARCH/SET_UNIVERSE",
			universe: 'sejour',
		};

		expect(actions.setUniverse('sejour')).toEqual(expectedAction);
	});

});
