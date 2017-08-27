import * as objectHelper from '../utils';

describe('deletePropertiesImmutable', () => {

	test('it should delete properties from object and return a new object', () => {
		const object = {a: 'prop1', b: 'prop2', c: 100, d: {'a1': 'subObject'}, e: 'lastProp' };
		const expectedObject = {b: 'prop2', e: 'lastProp' };
		const resetedObject = objectHelper.deletePropertiesImmutable(object, ['a', 'c', 'd', 'undefinedProp']);
		expect(resetedObject).toEqual(expectedObject);
		expect(object).toEqual({a: 'prop1', b: 'prop2', c: 100, d: {'a1': 'subObject'}, e: 'lastProp' });		
	});

});