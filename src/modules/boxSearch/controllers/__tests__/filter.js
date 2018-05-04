jest.mock('helpers/storage/idbStorage');
jest.mock('../../services/fetchBoxListService');

import { getFilterItemsStatisticMap } from '../filter';
import getFilterStructureMap from '../../configHelpers/filterConfigResolver'
import createInterval from 'helpers/dataStructure/interval';

const 
	filterConfigList = [
		{ filterName:'priceRange1', filterGroup: 'price', field: 'price', operator: 'inRangeOpenClosed', operand : createInterval(0, 50) },
		{ filterName:'priceRange2', filterGroup: 'price', field: 'price', operator: 'inRangeOpenClosed', operand: createInterval(50, 100) },
		{ filterName:'priceRange3', filterGroup: 'price', field: 'price', operator: 'inRangeOpenClosed', operand: createInterval(100, 200) },
		{ filterName:'priceRange4', filterGroup: 'price', field: 'price', operator: '>', operand: 200 },

		{ filterName:'forOnePerson', filterGroup: 'person', field: 'forOnePerson', operator: '===', operand: 1 },
		{ filterName:'forCouple', filterGroup: 'person', field: 'forCouple', operator: '===', operand: 1 },

		{ filterName:'cityLyon', field: 'city', operator: '===', operand: 1 },
		{ filterName:'boatExperience', filterGroup: 'experienceType', field: 'experienceType', operator: 'contains', operand: 'boat' },
		{ filterName:'carExperience', filterGroup: 'experienceType', field: 'experienceType', operator: 'contains', operand: 'car' },
		{ filterName:'planeExperience', filterGroup: 'experienceType', field: 'experienceType', operator: 'contains', operand: 'plane' }
	],
	universe = 'sejour',
	filterStructureMapPromise = getFilterStructureMap(universe, filterConfigList);
	

describe('getFilterItemsStatisticMap', () => {
	test('Should return filter statistic structure matching the filters applied (1)', async () => {
		const 
			filterStructureMap = await filterStructureMapPromise,
            filtersApplied = {priceRange1: createInterval(0, 50)},
            requestData = {filtersApplied, universe};

		const 
			result = getFilterItemsStatisticMap(requestData, filterStructureMap),
			expectedMap = new Map();

			expectedMap
			.set(true, [1,2])
			.set(false, [])
			.set('price', [3,4,5,6,7,8,9,10]);

		return expect(result).resolves.toEqual(expectedMap);
	});

	test('Should return filter statistic structure matching the filters applied (2)', async () => {
		const 
			filterStructureMap = await filterStructureMapPromise,
            filtersApplied = {priceRange4: true, cityLyon: 1, boatExperience: 'boat', planeExperience: 'plane'},
            requestData = {filtersApplied, universe};

		const 
			result = getFilterItemsStatisticMap(requestData, filterStructureMap),
			expectedMap = new Map();

			expectedMap
			.set(true, [6,7,8])
			.set(false, [1,2,3,5])
			.set('price', [4])
			.set('location', [9, 10]);
			
		return expect(result).resolves.toEqual(expectedMap);
	});		
});