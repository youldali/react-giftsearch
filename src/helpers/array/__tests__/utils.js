import * as arrayHelper from '../utils';

describe('findHighestValueInObjects', () => {
	const collection = [
		{'price': 50.3, name: 'abc'},
		{'price': 90.9, name: 'bcd'},
		{'price': 30, name: 'def'},
		{'price': 15, name: 'rer'},
		{'price': 101, name: 'fed'},
	];

	const collection2 = [
		{'price': 5023.37, name: 'abfewfewc'},
		{'price': 900.9, name: 'fewffbcd'},
		{'price': 3090.90, name: 'dfewewef'},
		{'price': -9999, name: 'xrewwwwr'},
		{'price': 101.5, name: 'xokpfpewfed'},
	];	

	test('it should return the highest price', () => {
		const result = arrayHelper.findHighestValueInObjects('price', collection);
		expect(result).toBe(101);

		const result2 = arrayHelper.findHighestValueInObjects('price', collection2);
		expect(result2).toBe(5023.37);		
	});

	test('it should the last name in alphabel sorting', () => {
		const result = arrayHelper.findHighestValueInObjects('name', collection);
		expect(result).toBe('rer');

		const result2 = arrayHelper.findHighestValueInObjects('name', collection2);
		expect(result2).toBe('xrewwwwr');		
	});	

	test('it should the last name in alphabel sorting', () => {
		const result = arrayHelper.findHighestValueInObjects('undefined', collection);
		expect(result).toBeUndefined();
	});		
});

describe('findIntersectionOfSortedArrays', () => {
	test('it should return the intersection of the 2 sorted arrays', () => {
		const a1 = [1,2,3,4,5,6,7,8,9,10];
		const b1 = [2,6,7,9,10];
		const i1 = [2,6,7,9,10];
		expect(arrayHelper.findIntersectionOfSortedArrays(Infinity, a1, b1)).toEqual(i1);

		const a2 = [100, 200, 201, 203, 209, 244, 400, 402, 405, 420, 500];
		const b2 = [1, 2, 3, 7, 90, 200, 201, 202, 205, 300, 304, 390, 391, 401, 413, 414, 490, 500];
		const i2 = [200, 201, 500];
		expect(arrayHelper.findIntersectionOfSortedArrays(Infinity, a2, b2)).toEqual(i2);
	});	

	test('it should return the N first intersection of the 2 sorted arrays', () => {
		const a1 = [1,2,3,4,5,6,7,8,9,10];
		const b1 = [2,6,7,9,10];
		const i1 = [2,6,7];
		expect(arrayHelper.findIntersectionOfSortedArrays(3, a1, b1)).toEqual(i1);
	});	

	test('it should return the intersection of the 2 sorted arrays (string)', () => {
		const a1 = ['boat', 'bicycle', 'car', 'helicopter', 'skate'];
		const b1 = ['car', 'plane', 'skate'];
		const i1 = ['car', 'skate'];
		expect(arrayHelper.findIntersectionOfSortedArrays(Infinity, a1, b1)).toEqual(i1);
	});	
});

describe('findElementInSortedArray', () => {

	test('it should ', () => {
		const a = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 15, 16, 50, 60, 100, 101, 103, 105, 107, 500, 550, 400, 500, 600];
		expect(arrayHelper.findElementInSortedArray(a, 3)).toEqual(2);
		expect(arrayHelper.findElementInSortedArray(a, 16)).toEqual(11);
		expect(arrayHelper.findElementInSortedArray(a, 1000)).toEqual(-1);
		expect(arrayHelper.findElementInSortedArray(a, 0)).toEqual(-1);
		expect(arrayHelper.findElementInSortedArray(a, 1)).toEqual(0);
		expect(arrayHelper.findElementInSortedArray(a, 600)).toEqual(23);
	});	

	test.only('it should ', () => {
		const a = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 15, 16, 50, 60, 100, 101, 103, 105, 107, 500, 550, 400, 500, 600];
		expect(arrayHelper.findElementInSortedArray(a, 107)).toEqual(0);
	});

});