jest.mock('../../helpers/idbStorage');

import { getOrderedList } from '../order';

describe('getOrderedList', () => {
	test('Should return the filtered list in correct order by price ASC', () => {
        const 
            orderBy = 'price',
            isOrderByReversed = false,
            universe = 'sejour',
            requestData = {orderBy, isOrderByReversed, universe},
            db = {},
            itemIdListValidated = [1, 3, 4, 7, 8, 9];

        const 
            orderedFilteredIdList = getOrderedList(db, requestData, itemIdListValidated),
            expected = [1, 3, 4, 7, 8, 9];
		return expect(orderedFilteredIdList).resolves.toEqual(expected);
    });
    
    test('Should return the filtered list in correct order by price DESC', () => {
        const 
            orderBy = 'price',
            isOrderByReversed = true,
            universe = 'sejour',
            requestData = {orderBy, isOrderByReversed, universe},
            db = {},
            itemIdListValidated = [1, 3, 4, 7, 8, 9];

        const 
            orderedFilteredIdList = getOrderedList(db, requestData, itemIdListValidated),
            expected = [9, 8, 7, 4, 3, 1];
		return expect(orderedFilteredIdList).resolves.toEqual(expected);
    });
    
    test('Should return the filtered list in correct order by city ASC', () => {
        const 
            orderBy = 'city',
            isOrderByReversed = false,
            universe = 'sejour',
            requestData = {orderBy, isOrderByReversed, universe},
            db = {},
            itemIdListValidated = [2, 3, 5, 6, 7, 10];

        const 
            orderedFilteredIdList = getOrderedList(db, requestData, itemIdListValidated),
            expected = [3, 10, 5, 2, 6, 7];
		return expect(orderedFilteredIdList).resolves.toEqual(expected);
	});
});