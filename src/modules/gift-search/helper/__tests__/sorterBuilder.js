import sorterBuilder from '../sorterBuilder';
import * as config from 'config';

const gift1 = {'name': 'Paris', 'price': 205, 'min_persons': 1,'max_persons': 1};
const gift2 = {'name': 'Lyon', 'price': 150, 'min_persons': 1,'max_persons': 2};
const gift3 = {'name': 'Barcelona', 'price': 700.5, 'min_persons': 2,'max_persons': 6};
const gift4 = {'name': 'Lyon', 'price': 990, 'min_persons': 1,'max_persons': 1};
const giftCollection = [gift1, gift2, gift3, gift4];



describe('sorterBuilder', () => {

	test('it should sort the gift by price', () => {
		const sortState = 'price';
		const expectedSort = [gift2, gift1, gift3, gift4];
		const sortedGifts = [...giftCollection].sort(sorterBuilder(sortState));
		expect(sortedGifts).toEqual(expectedSort);			
	});

	test('it should sort the gift by price DESC', () => {
		const sortState = '-price';
		const expectedSort = [gift4, gift3, gift1, gift2];
		const sortedGifts = [...giftCollection].sort(sorterBuilder(sortState));
		expect(sortedGifts).toEqual(expectedSort);			
	});	

});