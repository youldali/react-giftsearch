import * as objectHelper from '../utils';

describe('deletePropertiesImmutable', () => {

	test('it should delete properties from object and return a new object', () => {
		const object = {a: 'prop1', b: 'prop2', c: 100, d: {'a1': 'subObject'}, e: 'lastProp' };
		const expectedObject = {b: 'prop2', e: 'lastProp' };
		const resetedObject = objectHelper.deletePropertiesImmutable(['a', 'c', 'd', 'undefinedProp'])(object);

		expect(resetedObject).toEqual(expectedObject);
		expect(object).toEqual({a: 'prop1', b: 'prop2', c: 100, d: {'a1': 'subObject'}, e: 'lastProp' });		
	});

});

describe('hasOne', () => {
	const object = {a: 'prop1', b: 'prop2', c: 100};

	test('it return true if the Object has at least 1 of the mentionned property', () => {
		const propertiesToLookup = ['a', 'd', 'x', 'z'];
		const hasProperty = objectHelper.hasOne(propertiesToLookup)(object);
		expect(hasProperty).toBe(true)
	});

	test('it returns false if the Object has none of the mentionned property', () => {
		const propertiesToLookup = ['d', 'x', 'z'];
		const hasProperty = objectHelper.hasOne(propertiesToLookup)(object);
		expect(hasProperty).toBe(false)
	});

});