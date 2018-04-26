import * as actions from '../refineBoxListActions';

describe('setAppliedFilters', () => {
	test('it should return the "set filter" action creator with no related field to erase for filter: name', () => {
		const expectedAction = {
			type: "BOX_LIST_SEARCH/SET_APPLIED_FILTERS",
			filtersApplied: {
				'name': 'jean'
			}
		};

		expect(actions.setAppliedFilters({'name': 'jean'})).toEqual(expectedAction);
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
