jest.mock('../../helpers/idbStorage');

import { getPaginatedGiftList } from '../pagination';
import { giftCollection } from '../../helpers/__mocks__/idbStorage';

describe('getPaginatedGiftList', () => {
	test('Should return the items matching the IDs of the correct slice of the list', () => {
        const 
            page = 1,
            perPage = 3,
            universe = 'sejour',
            requestData = {universe, page},
            db = {},
            orderedFilteredIdList = [5,1,3,9,8];

        const 
            paginatedGiftList = getPaginatedGiftList(db, requestData, perPage, orderedFilteredIdList),
            expected = [giftCollection[4], giftCollection[0], giftCollection[2]];
		return expect(paginatedGiftList).resolves.toEqual(expected);
    });

    test('Should return the items matching the IDs of the correct slice of the list (2)', () => {
        const 
            page = 2,
            perPage = 4,
            universe = 'sejour',
            requestData = {universe, page},
            db = {},
            orderedFilteredIdList = [5, 1, 3, 9, 8, 2, 10];

        const 
            paginatedGiftList = getPaginatedGiftList(db, requestData, perPage, orderedFilteredIdList),
            expected = [giftCollection[7], giftCollection[1], giftCollection[9]];
		return expect(paginatedGiftList).resolves.toEqual(expected);
    });
});