import { getOperandList } from '../idbStorageService';
import * as giftFetcherRemote from '../../helpers/fetchGiftsRemotely';

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
    jest.spyOn(giftFetcherRemote, 'default').mockImplementation( universe => Promise.resolve(giftCollection) );
});

describe.only('getOperandList', () => {
	test('it gives the list of operand', () => {
        const
            universe = 'sejour',
            field = 'city';

        const 
            operands = getOperandList(universe, field),
            expected = ['Barcelona', 'Berlin', 'Dublin', 'Lyon', 'Paris'];

        expect(operands).resolves.toEqual(expected);
	});
});