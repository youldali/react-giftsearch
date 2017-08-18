import operators from '../operators';


describe('<', function(){

	test('it should return true when a < b', function(){
		const a = 10;
		const b = 20;
		expect(operators['<'](a, b)).toBe(true);
	});

	test('it should return false when a > b', function(){
		const a = 50;
		const b = 20;
		expect(operators['<'](a, b)).toBe(false);
	});

});

describe('>', function(){
	
	test('it should return true when a > b', function(){
		const a = 23;
		const b = 20;
		expect(operators['>'](a, b)).toBe(true);
	});

	test('it should return false when a < b', function(){
		const a = 10;
		const b = 20;
		expect(operators['>'](a, b)).toBe(false);
	});

});

describe('<=', function(){

	test('it should return true when a < b', function(){
		const a = 10;
		const b = 20;
		expect(operators['<='](a, b)).toBe(true);
	});

	test('it should return true when a == b', function(){
		const a = 20;
		const b = 20;
		expect(operators['<='](a, b)).toBe(true);
	});

	test('it should return false when a > b', function(){
		const a = 50;
		const b = 20;
		expect(operators['<='](a, b)).toBe(false);
	});

});

describe('>=', function(){

	test('it should return true when a > b', function(){
		const a = 15;
		const b = 14;
		expect(operators['>='](a, b)).toBe(true);
	});

	test('it should return true when a == b', function(){
		const a = 12;
		const b = 12;
		expect(operators['<='](a, b)).toBe(true);
	});

	test('it should return false when a < b', function(){
		const a = 18;
		const b = 20;
		expect(operators['>='](a, b)).toBe(false);
	});

});

describe('==', function(){

	test('it should return true when a == b (string)', function(){
		const a = 'test';
		const b = "test";
		expect(operators['=='](a, b)).toBe(true);
	});

	test('it should return true when a != b (string)', function(){
		const a = 'test1';
		const b = 'test2';
		expect(operators['=='](a, b)).toBe(false);
	});

	test('it should return true when a == b (number)', function(){
		const a = 10;
		const b = 10;
		expect(operators['=='](a, b)).toBe(true);
	});

	test('it should return true when a != b (number)', function(){
		const a = 12;
		const b = 14;
		expect(operators['=='](a, b)).toBe(false);
	});

	test('it should return true when a == b (mixed)', function(){
		const a = '1';
		const b = 1;
		expect(operators['=='](a, b)).toBe(true);
	});

});

describe('===', function(){

	test('it should return true when a === b', function(){
		const a = 'test';
		const b = "test";
		expect(operators['==='](a, b)).toBe(true);
	});

	test('it should return true when a !== b', function(){
		const a = 'test1';
		const b = 'test2';
		expect(operators['==='](a, b)).toBe(false);
	});

	test('it should return true when a === b (number)', function(){
		const a = 10;
		const b = 10;
		expect(operators['==='](a, b)).toBe(true);
	});

	test('it should return true when a !== b (number)', function(){
		const a = 12;
		const b = 14;
		expect(operators['==='](a, b)).toBe(false);
	});

	test('it should return false when a === b (mixed)', function(){
		const a = '1';
		const b = 1;
		expect(operators['==='](a, b)).toBe(false);
	});

	
});

describe('isIncluded', function(){

	test('it should return true when a is a subset of b (string)', function(){
		const a = 'test';
		const b = "he tests things";
		expect(operators['isIncluded'](a, b)).toBe(true);
	});

	test('it should return false when a is not a subset of b (string)', function(){
		const a = 'test';
		const b = "he things";
		expect(operators['isIncluded'](a, b)).toBe(false);
	});

	test('it should return true when a is a subset of b (array)', function(){
		const a = 20;
		const b = [10, 20, 30];
		expect(operators['isIncluded'](a, b)).toBe(true);
	});

	test('it should return false when a is not a subset of b (string)', function(){
		const a = 20;
		const b = [10, 25, 30];
		expect(operators['isIncluded'](a, b)).toBe(false);
	});

	test('it should return false when b in not an array', function(){
		const a = 20;
		const b = 20;
		expect(operators['isIncluded'](a, b)).toBe(false);
	});
	
});

