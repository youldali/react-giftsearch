jest.mock('../../helpers/idbStorage');

import { getItemIdListMatchingFilter } from '../filterStatistic';
import createInterval from 'helpers/dataStruture/interval';
import { giftCollection } from '../../helpers/__mocks__/idbStorage';

describe('getItemIdListMatchingFilter', () => {
	test('should return the id list matching the filter: price > 200', () => {
        const 
            universe = 'sejour',
            db = {},
            filterCriteria = { field: 'price', operator: '>', operand: 200 },
            filterName = 'priceRange4';

        const 
            idListMappedToFilter = getItemIdListMatchingFilter(db, universe, filterCriteria, filterName: FilterName),
            expected = {
                [filterName]: [5, 6, 7, 8, 9, 10]
            };

		return expect(idListMappedToFilter).resolves.toEqual(expected);
    });

    test('should return the id list matching the filter: 50 <= price <= 200', () => {
        const 
            universe = 'sejour',
            db = {},
            filterCriteria = { field: 'price', operator: 'inRangeClosed', operand: createInterval(50, 200) },
            filterName = 'priceRange';

        const 
            idListMappedToFilter = getItemIdListMatchingFilter(db, universe, filterCriteria, filterName: FilterName),
            expected = {
                [filterName]: [3, 4]
            };

		return expect(idListMappedToFilter).resolves.toEqual(expected);
    });

    test.only('should return the id list matching each filter for experience type ', () => {
        const 
            universe = 'sejour',
            db = {},
            filterCriteria = { field: 'experienceType', operator: 'hasOneInCommon', operand: ['boat', 'car', 'plane'] },
            filterName = 'priceRange';

        const 
            idListMappedToFilter = getItemIdListMatchingFilter(db, universe, filterCriteria, filterName: FilterName),
            expected = {
                [filterName]: {
                    boat: [1, 3, 4, 6, 7, 8, 10],
                    car: [1, 2, 6, 7, 8],
                    plane: [4, 7, 9, 10]
                }
            };

		return expect(idListMappedToFilter).resolves.toEqual(expected);
    });

});