jest.mock('../../helpers/idbStorage');

import { getOrderedList } from '../order';

describe('getOrderedList', () => {
	test('Should return filter statistic structure matching the filters applied (1)', () => {
        const 
            orderBy = 'price',
            universe = 'sejour',
            requestData = {orderBy, universe},
            db = {},
            filteredObjectIdsMappedByGroup = new Map();

        filteredObjectIdsMappedByGroup
			.set(true, [1, 3, 4, 7, 8, 9])
			.set(false, [2, 5, 6, 10]);

		const orderedFilteredList = getOrderedList(db, requestData, filteredObjectIdsMappedByGroup);
		return expect(result).resolves.toEqual(expected);
	});
});