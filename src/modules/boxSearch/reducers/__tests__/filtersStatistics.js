import filterStatisticsReducer from '../filtersStatistics';

const initialState = {};
describe('initial state', () => {

	test('it initializes state', () => {
		const newState = filterStatisticsReducer(undefined, {});
		expect(newState).toEqual(initialState);
	});

});


describe('SET FILTER STATISTICS', () => {
	test('it changes the filters Statistics state', () => {
        const filtersStatisticsByFilter = {
            priceRange1: {
                stat: 14,
                type: 'absolute'
            },
            priceRange2: {
                stat: 90,
                type: 'absolute'
            }
        };

		const action = {
			type: "BOX_LIST_SEARCH/SET_FILTERS_STATISTICS",
			filtersStatisticsByFilter
		};
		const newState = filterStatisticsReducer({}, action);
        expect(newState).toEqual(filtersStatisticsByFilter);
	});
});
