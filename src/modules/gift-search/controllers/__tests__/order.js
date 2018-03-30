jest.mock('../../helpers/idbStorage');

import { getOrderedList } from '../order';

describe('getOrderedList', () => {
	test('Should the filtered list in correct order by price ASC', () => {
        const 
            orderBy = 'price',
            isOrderByReversed = false,
            universe = 'sejour',
            requestData = {orderBy, isOrderByReversed, universe},
            db = {},
            filteredObjectIdsMappedByGroup = new Map();

        filteredObjectIdsMappedByGroup
			.set(true, [1, 3, 4, 7, 8, 9])
			.set(false, [2, 5, 6, 10]);

        const 
            orderedFilteredList = getOrderedList(db, requestData, filteredObjectIdsMappedByGroup),
            expected = [1, 3, 4, 7, 8, 9];
		return expect(orderedFilteredList).resolves.toEqual(expected);
    });
    
    test('Should the filtered list in correct order by price DESC', () => {
        const 
            orderBy = 'price',
            isOrderByReversed = true,
            universe = 'sejour',
            requestData = {orderBy, isOrderByReversed, universe},
            db = {},
            filteredObjectIdsMappedByGroup = new Map();

        filteredObjectIdsMappedByGroup
			.set(true, [1, 3, 4, 7, 8, 9])
			.set(false, [2, 5, 6, 10]);

        const 
            orderedFilteredList = getOrderedList(db, requestData, filteredObjectIdsMappedByGroup),
            expected = [9, 8, 7, 4, 3, 1];
		return expect(orderedFilteredList).resolves.toEqual(expected);
    });
    
    test('Should the filtered list in correct order by city ASC', () => {
        const 
            orderBy = 'city',
            isOrderByReversed = false,
            universe = 'sejour',
            requestData = {orderBy, isOrderByReversed, universe},
            db = {},
            filteredObjectIdsMappedByGroup = new Map();

        filteredObjectIdsMappedByGroup
			.set(true, [2, 3, 5, 6, 7, 10])
			.set(false, [1, 4, 8, 9]);

        const 
            orderedFilteredList = getOrderedList(db, requestData, filteredObjectIdsMappedByGroup),
            expected = [3, 10, 5, 2, 6, 7];
		return expect(orderedFilteredList).resolves.toEqual(expected);
	});
});