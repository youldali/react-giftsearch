import filterReducer from '../filtersApplied.js';

test('it initializes state', () => {
	const newState = filterReducer(undefined, {});
	expect(newState).toEqual({});
});


describe('BOX_LIST_SEARCH/SET_APPLIED_FILTERS', () => {
	test('it adds a filter', () => {
		const action = {
			type: "BOX_LIST_SEARCH/SET_APPLIED_FILTERS",
			filtersToApply:{'name': 'myFilter',},
		};

		const prevState = {};
		const newState = filterReducer({}, action);

		expect(newState).toEqual({'name': 'myFilter'});	
		expect(newState).not.toBe(prevState);

	});

	test('it adds multiple filters', () => {
		const action = {
			type: "BOX_LIST_SEARCH/SET_APPLIED_FILTERS",
			filtersToApply:{
				'name': 'myFilter',
				'price': 1234,
				'value': 'val',
			},
		};

		const prevState = {};
		const newState = filterReducer(prevState, action);

		expect(newState).toEqual({'name': 'myFilter', 'price': 1234, 'value': 'val'});
		expect(newState).not.toBe(prevState);
	});
});

describe('BOX_LIST_SEARCH/RESET_APPLIED_FILTERS', () => {
	test('it resets a filter already set', () => {
		const action = {
			type: "BOX_LIST_SEARCH/RESET_APPLIED_FILTERS",
			filtersToReset: ['name', 'surname']
		};

		const prevState = {'name': 'myFilterValue', 'lastname': 'myLastname', 'surname': 'mySurname'};
		const newState = filterReducer(prevState, action);

		expect(newState).toEqual({'lastname': 'myLastname'});	
		expect(newState).not.toBe(prevState);
	});

	test('it resets a filter that does not exist', () => {
		const action = {
			type: "BOX_LIST_SEARCH/RESET_APPLIED_FILTERS",
			filtersToReset: ['name']
		};
		const prevState = {};
		const newState = filterReducer(prevState, action);

		expect(newState).toEqual({});	
		expect(newState).toBe(prevState);	
	});

	test('it resets a filter that does not exist (2)', () => {
		const action = {
			type: "BOX_LIST_SEARCH/RESET_APPLIED_FILTERS",
			filtersToReset: ['name']
		};
		const prevState = {surname: 'test'};
		const newState = filterReducer(prevState, action);

		expect(newState).toBe(prevState);	
	});	
});

describe('BOX_LIST_SEARCH/RESET_ALL_APPLIED_FILTERS', () => {
	test('it resets all filters with filter already existing', () => {
		const action = {
			type: "BOX_LIST_SEARCH/RESET_ALL_APPLIED_FILTERS",
		};
		const prevState = {surname: 'test', name: 'andre'};
		const newState = filterReducer(prevState, action);

		expect(newState).not.toBe(prevState);
		expect(newState).toEqual({});	
	});	

	test('it resets all filters without filter already existing', () => {
		const action = {
			type: "BOX_LIST_SEARCH/RESET_ALL_APPLIED_FILTERS",
		};
		const prevState = {};
		const newState = filterReducer(prevState, action);

		expect(newState).toBe(prevState);
		expect(newState).toEqual({});	
	});		
});