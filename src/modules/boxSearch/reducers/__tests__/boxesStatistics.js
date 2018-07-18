import filterStatisticsReducer from '../boxesStatistics';

const initialState = {
    filtersStatisticsByFilter: {},
    numberOfMatchingBoxes: 0,
    totalNumberOfBoxes: 0,
 };

describe('initial state', () => {

	test('it initializes state', () => {
		const newState = filterStatisticsReducer(undefined, {});
		expect(newState).toEqual(initialState);
	});

});


describe('SET BOXES STATISTICS', () => {
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
        },
        numberOfMatchingBoxes = 50,
        totalNumberOfBoxes = 125,
        boxesStatistics = {filtersStatisticsByFilter, numberOfMatchingBoxes, totalNumberOfBoxes};

		const action = {
			type: "BOX_LIST_SEARCH/SET_BOXES_STATISTICS",
			boxesStatistics
		};
		const newState = filterStatisticsReducer({}, action);
        expect(newState).toEqual(boxesStatistics);
	});
});
