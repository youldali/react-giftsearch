import { getOperandList, getItemIdListMatchingSingleFilter, getBoxesList } from '../idbStorageService';
import * as fetchBoxListService from '../fetchBoxListService';
import createFilterStructure from '../../domainModel/filterStructure'
import createInterval from 'helpers/dataStructure/interval';

jest.mock('helpers/storage/idbStorage');
//jest.mock('../../../../../../helpers/storage/idbStorage');

const gift1 = {'id': 1, name: 'stay in Paris', 'city': 'Paris', 'price': 25, forOnePerson: 1, forCouple: 0, experienceType: ['boat', 'car', 'parachute']};
const gift2 = {'id': 2, name: 'stay in Lyon', 'city': 'Lyon', 'price': 40, forOnePerson: 0, forCouple: 1, experienceType: ['car']};
const gift3 = {'id': 3, name: 'stay in barcelona', 'city': 'Barcelona', 'price': 120, forOnePerson: 1, forCouple: 0, experienceType: ['boat']};
const gift4 = {'id': 4, name: 'eat in Lyon', 'city': 'Lyon', 'price': 199, forOnePerson: 1, forCouple: 0, experienceType: ['boat', 'plane']};
const gift5 = {'id': 5, name: 'stay in Dublin', 'city': 'Dublin', 'price': 301, forOnePerson: 1, forCouple: 1, experienceType: ['parachute']};
const gift6 = {'id': 6, name: 'cycle in Lyon', 'city': 'Lyon', 'price': 600, forOnePerson: 0, forCouple: 1, experienceType: ['boat', 'car']};
const gift7 = {'id': 7, name: 'stay in Lyon 2', 'city': 'Lyon', 'price': 700, forOnePerson: 0, forCouple: 1, experienceType: ['boat', 'car', 'plane']};
const gift8 = {'id': 8, name: 'stay in Lyon 3', 'city': 'Lyon', 'price': 800, forOnePerson: 0, forCouple: 1, experienceType: ['boat', 'car']};
const gift9 = {'id': 9, name: 'eat in Paris', 'city': 'Paris', 'price': 900, forOnePerson: 0, forCouple: 1, experienceType: ['plane']};
const gift10 = {'id':10, name: 'stay in Berlin', 'city': 'Berlin', 'price': 1000, forOnePerson: 0, forCouple: 1, experienceType: ['boat', 'plane']};

export
const giftCollection = [gift1, gift2, gift3, gift4, gift5, gift6, gift7, gift8, gift9, gift10];


beforeAll(() => {
    jest.spyOn(fetchBoxListService, 'default').mockImplementation( universe => Promise.resolve(giftCollection) );
});


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
            expected = [gift2, gift3, gift5];

        expect(items).resolves.toEqual(expected);
    });
});



