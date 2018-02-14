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
		console.log(result);
	});		

});