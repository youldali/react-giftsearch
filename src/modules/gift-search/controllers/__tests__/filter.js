jest.mock('../../helpers/idbStorage');

import { getFilterItemsStatisticMap } from '../filter';
import { curry } from 'ramda';

const filtersCriteriasCollection = {
	priceRange1: { field: 'price', operator: 'inRangeOpenClosed', operand: [0, 50]},
	priceRange2: { field: 'price', operator: 'inRangeOpenClosed', operand: [50, 100]},
	priceRange3: { field: 'price', operator: 'inRangeOpenClosed', operand: [100, 200]},
 	priceRange4: { field: 'price', operator: '>', operand: 200} ,

	forOnePerson: { field: 'forOnePerson', operator: '===', operand: 1 },
	forCouple: { field: 'forCouple', operator: '===', operand: 1 },

	city: { field: 'name', operator: '===' },
	cityLyon: { field: 'name', operator: '===', operand: 'Lyon' },

	id: { field: 'id', operator: 'isIncluded'},
	excluWeb: { field: 'webExclusive', operator: '===', operand: 1 },
	experienceType: { field: 'experienceType', operator: 'hasOneInCommon' }
};

const filtersGroupsCollection = {
	forPersonsRange: 'person',
	forSoloOnly: 'person',
	forCouple: 'person',
	city: 'location',
	cityLyon: 'location',
	priceRange1: 'price',
	priceRange2: 'price',
	priceRange3: 'price',
	priceRange4: 'price',
};

describe('_getFilterItemsStatisticMap', () => {
	test('Should return filter statistic structure matching the filters applied (1)', () => {
        const 
            filters = {priceRange1: true},
            universe = 'sejour',
            requestData = {filters, universe},
			db = {};

		const 
			result = getFilterItemsStatisticMap(db, requestData, filtersCriteriasCollection, filtersGroupsCollection),
			expected = new Map();
		expected
			.set(true, [1,2])
			.set(false, [])
			.set('price', [3,4,5,6,7,8,9,10]);

		return expect(result).resolves.toEqual(expected);
	});

	test('Should return filter statistic structure matching the filters applied (2)', () => {
        const 
            filters = {priceRange4: true, city: 'Lyon', experienceType: ['boat', 'plane']},
            universe = 'sejour',
            requestData = {filters, universe},
			db = {};

		const 
			result = getFilterItemsStatisticMap(db, requestData, filtersCriteriasCollection, filtersGroupsCollection),
			expected = new Map();
		expected
			.set(true, [6,7,8,10])
			.set(false, [1,2,3,5])
			.set('price', [4])
			.set('location', [9]);
			
		return expect(result).resolves.toEqual(expected);
	});		
});