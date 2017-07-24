import sorter, {sorterBuilder} from '../sorterBuilder';
import * as config from 'config';

const gift1 = {'name': 'Paris', 'price': 205, 'min_persons': 1,'max_persons': 1};
const gift2 = {'name': 'Lyon', 'price': 150, 'min_persons': 1,'max_persons': 2};
const gift3 = {'name': 'Barcelona', 'price': 700.5, 'min_persons': 2,'max_persons': 6};
const gift4 = {'name': 'Lyon', 'price': 990, 'min_persons': 1,'max_persons': 1};
const giftCollection = [gift1, gift2, gift3, gift4];



describe('sorterBuilder', () => {

	test('it should return > 0 when A > B for number', () => {
		const sortState = 'price';
		const comparisonResult = sorterBuilder(sortState)(gift1, gift2);
		expect(comparisonResult).toBeGreaterThanOrEqual(1);
	});

	test('it should return > 0 when A > B for string', () => {
		const sortState = 'name';
		const comparisonResult = sorterBuilder(sortState)(gift1, gift2);
		expect(comparisonResult).toBeGreaterThanOrEqual(1);
	});	

	test('it should return == 0 when equal', () => {
		const sortState = 'name';
		const comparisonResult = sorterBuilder(sortState)(gift1, gift1);
		expect(comparisonResult).toBe(0);		
	});	

});

describe('sorter', () => {

	test('it should sort the gift by price', () => {
		const sortState = 'price';
		const expectedSort = [gift2, gift1, gift3, gift4];
		const sortedGifts = sorter(giftCollection, sortState)
		expect(sortedGifts).toEqual(expectedSort);			
	});

	test('it should sort the gift by price DESC', () => {
		const sortState = '-price';
		const expectedSort = [gift4, gift3, gift1, gift2];
		const sortedGifts = sorter(giftCollection, sortState);
		expect(sortedGifts).toEqual(expectedSort);			
	});	

	test('it should sort the gift by name', () => {
		const sortState = 'name';
		const expectedSort = [gift3, gift2, gift4, gift1];
		const sortedGifts = sorter(giftCollection, sortState)
		expect(sortedGifts).toEqual(expectedSort);			
	});	

	test('it should sort the gift by name DESC', () => {
		const sortState = '-name';
		const expectedSort = [gift1, gift2, gift4, gift3];
		const sortedGifts = sorter(giftCollection, sortState)
		expect(sortedGifts).toEqual(expectedSort);			
	});		

});