import sorter, {sorterBuilder} from '../sortList';

const gift1 = {id: '30', 'name': 'Paris', 'price': 205, 'min_persons': 1,'max_persons': 1};
const gift2 = {id: '18', 'name': 'Lyon', 'price': 150, 'min_persons': 1,'max_persons': 2};
const gift3 = {id: '1', 'name': 'Barcelona', 'price': 700.5, 'min_persons': 2,'max_persons': 6};
const gift4 = {id: '35', 'name': 'Lyon', 'price': 990, 'min_persons': 1,'max_persons': 1};
const giftCollection = [gift1, gift2, gift3, gift4];



describe('sorterBuilder for field name', () => {

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

	test('it should return == 0 when sort state in empty', () => {
		const sortState = '';
		const comparisonResult = sorterBuilder(sortState)(gift1, gift1);
		expect(comparisonResult).toBe(0);		
	});		

});

describe('sorterBuilder for predefined ID list', () => {

	test('it should return < 0  id A before id B', () => {
		const sortState = ['18', '1'];
		const comparisonResult = sorterBuilder(sortState)(gift2, gift3);
		expect(comparisonResult).toBeLessThanOrEqual(-1);
	});

	test('it should return > 0  id B before id A', () => {
		const sortState = ['1', '18'];
		const comparisonResult = sorterBuilder(sortState)(gift2, gift3);
		expect(comparisonResult).toBeGreaterThanOrEqual(1);
	});	

	test('it should return < 0 when id B undefined', () => {
		const sortState = ['18'];
		const comparisonResult = sorterBuilder(sortState)(gift2, gift3);
		expect(comparisonResult).toBeLessThanOrEqual(-1);
	});	

	test('it should return 0 when id A and B are undefined', () => {
			const sortState = [];
			const comparisonResult = sorterBuilder(sortState)(gift2, gift3);
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

	test('it should leave the collection unsorted when sortState is empty', () => {
		const sortState = '';
		const expectedSort = giftCollection;
		const sortedGifts = sorter(giftCollection, sortState)
		expect(sortedGifts).toEqual(expectedSort);			
	});		

	test('it should sort the collection by ID', () => {
		const sortState = ['18', '1', '30', '35'];
		const expectedSort = [gift2, gift3, gift1, gift4];;
		const sortedGifts = sorter(giftCollection, sortState)
		expect(sortedGifts).toEqual(expectedSort);			
	});	

test('it should sort the collection by ID and leave the non referenced items to their natural order', () => {
		const sortState = ['30', '1'];
		const expectedSort = [gift1, gift3, gift2, gift4];;
		const sortedGifts = sorter(giftCollection, sortState)
		expect(sortedGifts).toEqual(expectedSort);			
	});	

});