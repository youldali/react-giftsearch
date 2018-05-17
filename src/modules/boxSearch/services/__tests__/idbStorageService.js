import { getAllBoxesId, getAllBoxesIdOrderByField, getBoxesList, getItemIdListMatchingSingleFilter, getOperandList, iterateOverBoxes } from '../idbStorageService';
import * as fetchBoxListService from '../fetchBoxListService';
import createFilterStructure from '../../domainModel/filterStructure'
import createInterval from 'helpers/dataStructure/interval';
import { boxCollection, boxes } from '../__mocks__/fetchBoxListService';

jest.mock('helpers/storage/idbStorage');
jest.mock('../fetchBoxListService');

describe('getItemIdListMatchingSingleFilter', () => {
	test('get the item id matching the filter structure passed (1)', () => {
        const
            universe = 'sejour',
            filterStructure = createFilterStructure({ filterName:'priceRange1', filterGroup: 'price', field: 'price', operator: 'inRangeOpenClosed', operand : createInterval(0, 50) });

        const 
            matchingItemsIdList = getItemIdListMatchingSingleFilter(universe, filterStructure),
            expected = [1, 2];

        expect(matchingItemsIdList).resolves.toEqual(expected);
    });
    
    test('get the item id matching the filter structure passed (2)', () => {
        const
            universe = 'sejour',
            filterStructure = createFilterStructure({ filterName:'priceRange1', filterGroup: '', field: 'experienceType', operator: 'contains', operand : 'plane' });

        const 
            matchingItemsIdList = getItemIdListMatchingSingleFilter(universe, filterStructure),
            expected = [4, 7, 9, 10];

        expect(matchingItemsIdList).resolves.toEqual(expected);
	});
});

describe('getOperandList', () => {
	test('it gives the list of operand (1)', () => {
        const
            universe = 'sejour',
            field = 'city';

        const 
            operands = getOperandList(universe, field),
            expected = ['Barcelona', 'Berlin', 'Dublin', 'Lyon', 'Paris'];

        expect(operands).resolves.toEqual(expected);
    });
    
    test('it gives the list of operand (2)', () => {
        const
            universe = 'sejour',
            field = 'experienceType';

        const 
            operands = getOperandList(universe, field),
            expected = ['boat', 'car', 'parachute', 'plane'];

        expect(operands).resolves.toEqual(expected);
	});
});


describe('getBoxesList', () => {
	test('it gives the list of item matching the ids passed', () => {
        const
            universe = 'sejour',
            idList = [2, 3, 5];

        const 
            items = getBoxesList(universe, idList),
            expected = [boxes.box2, boxes.box3, boxes.box5];

        expect(items).resolves.toEqual(expected);
    });
});


describe('iterateOverBoxes', () => {
	test('it executes the function over all boxes in universe', async () => {
        const
            universe = 'sejour',
            numberList = [],
            callback = (id, element) => numberList.push(id * 2);

        const 
            promise = iterateOverBoxes(universe, callback),
            expected = [2, 4, 6, 8, 10, 12, 14, 16, 18, 20];

        await promise;
        expect(numberList).toEqual(expected);
    });
});


describe('getAllBoxesIdOrderByField', () => {
	test('it returns all boxes id sorted according to the field passed', async () => {
        const
            universe = 'sejour',
            field = 'city',
            isReversedDirection = false;

        const 
            itemIds = getAllBoxesIdOrderByField(universe, field, isReversedDirection),
            expected = [3, 10, 5, 2, 4, 6, 7, 8, 1, 9];

        expect(itemIds).resolves.toEqual(expected);
    });


    test('it returns all boxes id sorted according to the field passed, in reversed direction', async () => {
        const
            universe = 'sejour',
            field = 'city',
            isReversedDirection = true;

        const 
            itemIds = getAllBoxesIdOrderByField(universe, field, isReversedDirection),
            expected = [9, 1, 8, 7, 6, 4, 2, 5, 10, 3];

        expect(itemIds).resolves.toEqual(expected);
    });

});


describe('getAllBoxesId', () => {
	test('it returns all boxes id', async () => {
        const
            universe = 'sejour',
            isReversedDirection = false;

        const 
            itemIds = getAllBoxesId(universe, isReversedDirection),
            expected = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

        expect(itemIds).resolves.toEqual(expected);
    });


    test('it returns all boxes id sorted according to the field passed, in reversed direction', async () => {
        const
            universe = 'sejour',
            isReversedDirection = true;

        const 
            itemIds = getAllBoxesId(universe, isReversedDirection),
            expected = [10, 9, 8, 7, 6, 5, 4, 3, 2, 1];

        expect(itemIds).resolves.toEqual(expected);
    });

});

