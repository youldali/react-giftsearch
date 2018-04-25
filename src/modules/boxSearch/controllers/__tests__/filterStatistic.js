jest.mock('../../helpers/idbStorage');

import { getFilterStatistic } from '../filterStatistic';
import { giftCollection } from '../../helpers/__mocks__/idbStorage';
import createInterval from 'helpers/dataStruture/interval';
import createFilterStructure from '../../domainModel/filterStructure.js';

describe('getFilterStatistic', () => {
	test('should return the correct filter statistic for single operand and no group', async () => {
        const db = {};

        const 
            filtersSelectedState = {priceRange1: createInterval(0, 100)},
            universe = 'sejour',
            requestData = {filtersSelectedState, universe};


        const
            filterName = 'priceRange1',
            filterGroup = 'price',
            filterCriteria = { field: 'price', operator: 'inRangeOpenClosed', operand : createInterval(0, 100) },
            filterStructure = await createFilterStructure(universe, filterName, filterGroup, filterCriteria); 


        const filteredObjectIdsMappedByGroup = new Map()
            .set(true, [1, 2, 7, 8, 10]);


        const expected = {
            "[0,100]": { type: 'absolute', idList: [1, 2] }
        };
        const filterStatistic = getFilterStatistic(db, requestData, filteredObjectIdsMappedByGroup, filterStructure);
		return expect(filterStatistic).resolves.toEqual(expected);
    });


    test('should return the correct filter statistic for single operand and group', async () => {
        const db = {};

        const 
            filtersSelectedState = {priceRange2: createInterval(200, 1000)},
            universe = 'sejour',
            requestData = {filtersSelectedState, universe};


        const
            filterName = 'priceRange1',
            filterGroup = 'price',
            filterCriteria = { field: 'price', operator: 'inRangeOpenClosed', operand : createInterval(0, 100) },
            filterStructure = await createFilterStructure(universe, filterName, filterGroup, filterCriteria); 


        const filteredObjectIdsMappedByGroup = new Map()
            .set(true, [5, 7, 8, 9, 10])
            .set('price', [1, 2, 3, 4]);


        const expected = {
            "[0,100]": { type: 'relative', idList: [1, 2] }
        };
        const filterStatistic = getFilterStatistic(db, requestData, filteredObjectIdsMappedByGroup, filterStructure);
		return expect(filterStatistic).resolves.toEqual(expected);
    });

    test('should return the correct filter statistic for multiple operand and no group ', async () => {
        const db = {};

        const 
            filtersSelectedState = {},
            universe = 'sejour',
            requestData = {filtersSelectedState, universe};


        const
            filterName = 'experienceType',
            filterGroup = undefined,
            filterCriteria = { field: 'experienceType', operator: 'hasOneInCommon', operand : ['boat', 'car', 'plane'] },
            filterStructure = await createFilterStructure(universe, filterName, filterGroup, filterCriteria); 


        const filteredObjectIdsMappedByGroup = new Map()
            .set(true, [2, 3, 5, 6, 7, 9, 10]);

        const expected = {
            "boat": { type: 'absolute', idList: [3, 6, 7, 10] },
            "car": { type: 'absolute', idList: [2, 6, 7] },
            "plane": { type: 'absolute', idList: [7, 9, 10] },
        };
        const filterStatistic = getFilterStatistic(db, requestData, filteredObjectIdsMappedByGroup, filterStructure);
		return expect(filterStatistic).resolves.toEqual(expected);
    });

    test('should return the correct filter statistic for multiple operand and group ', async () => {
        const db = {};

        const 
            filtersSelectedState = {experienceType: ['parachute']},
            universe = 'sejour',
            requestData = {filtersSelectedState, universe};


        const
            filterName = 'experienceType',
            filterGroup = undefined,
            filterCriteria = { field: 'experienceType', operator: 'hasOneInCommon', operand : ['boat', 'car', 'plane'] },
            filterStructure = await createFilterStructure(universe, filterName, filterGroup, filterCriteria); 


        const filteredObjectIdsMappedByGroup = new Map()
            .set(true, [1, 5]);

        const expected = {
            "boat": { type: 'relative', idList: [3, 6, 7, 10] },
            "car": { type: 'relative', idList: [2, 6, 7] },
            "plane": { type: 'relative', idList: [7, 9, 10] },
        };
        const filterStatistic = getFilterStatistic(db, requestData, filteredObjectIdsMappedByGroup, filterStructure);
		return expect(filterStatistic).resolves.toEqual(expected);
    });
});