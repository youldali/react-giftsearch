//import { giftCollection } from '../../services/__mocks__/idbStorage';
import { getOperandList, generateFilterConfigForEachOperand, getFilterStructureByFilterGroup, getFilterStructureMap } from '../filterConfigResolver';
import createInterval from 'helpers/dataStructure/interval';
import createFilterStructure from '../../domainModel/filterStructure'
import {composeP} from 'ramda';

jest.mock('helpers/storage/idbStorage');
jest.mock('../../services/fetchBoxListService');

describe('getOperandList', () => {
	test('Should return the operand list matching field and universe (1)', () => {
        const 
            field = 'experienceType',
            universe = 'sejour';
            
        const expected = ["boat", "car", "parachute", "plane"];
        const operandList = getOperandList(universe, field);
        return expect(operandList).resolves.toEqual(expected);
    });

    test('Should return the operand list matching field and universe (2)', () => {
        const 
            field = 'forOnePerson',
            universe = 'sejour';
            
        const expected = [0, 1];
        const operandList = getOperandList(universe, field);
        return expect(operandList).resolves.toEqual(expected);
    });
});


describe('generateFilterConfigForEachOperand', () => {
	test('Should generate a filter config per operand found', () => {
        const 
            filterBaseConfig = { filterBaseName: 'experienceType', field: 'experienceType', operator: 'contains'},
            universe = 'sejour';
            
        const expected = [
            { filterName:'experienceType_boat', filterGroup: undefined, field: 'experienceType', operator: 'contains', operand : 'boat', label: 'boat' },
            { filterName:'experienceType_car', filterGroup: undefined, field: 'experienceType', operator: 'contains', operand : 'car', label: 'car' },
            { filterName:'experienceType_parachute', filterGroup: undefined, field: 'experienceType', operator: 'contains', operand : 'parachute', label: 'parachute' },
            { filterName:'experienceType_plane', filterGroup: undefined, field: 'experienceType', operator: 'contains', operand : 'plane', label: 'plane' },
        ];
        const filterConfigList = generateFilterConfigForEachOperand(filterBaseConfig, universe);
        return expect(filterConfigList).resolves.toEqual(expected);
    });
});


describe('getFilterStructureMap', () => {
	test('get a filterStructureMap object from a static filter config list', async () => {
        const 
            filterConfigList = [
                { filterName:'priceRange1', filterGroup: 'price', field: 'price', operator: 'inRangeOpenClosed', operand : createInterval(0, 50), label: 'from 0 to 50' },
                { filterName:'priceRange2', filterGroup: 'price', field: 'price', operator: 'inRangeOpenClosed', operand: createInterval(50, 100), label: 'from 50 to 100' },
                { filterName:'priceRange3', filterGroup: 'price', field: 'price', operator: 'inRangeOpenClosed', operand: createInterval(100, 200), label: 'from 100 to 200' },
                { filterName:'priceRange4', filterGroup: 'price', field: 'price', operator: '>', operand: 200, label: 'more than 200' }
            ],
            universe = 'sejour';
            
        const expected = {
            priceRange1: createFilterStructure(filterConfigList[0]),
            priceRange2: createFilterStructure(filterConfigList[1]),
            priceRange3: createFilterStructure(filterConfigList[2]),
            priceRange4: createFilterStructure(filterConfigList[3]),
        };
        const filterStructureMap = getFilterStructureMap(universe, filterConfigList);
        return expect(filterStructureMap).resolves.toEqual(expected);
    });

    test('get a filterStructureMap object from a dynamic filter config list', async () => {
        const 
            filterConfigList = [
                { filterName:'priceRange1', filterGroup: 'price', field: 'price', operator: 'inRangeOpenClosed', operand : createInterval(0, 50), label: 'from 0 to 50' },
                { filterName:'priceRange2', filterGroup: 'price', field: 'price', operator: 'inRangeOpenClosed', operand: createInterval(50, 100), label: 'from 50 to 100' },
                generateFilterConfigForEachOperand({ filterBaseName: 'experienceType', field: 'experienceType', operator: 'contains'})
            ],
            universe = 'sejour';
            
        const dynamicFilterConfig = [
            { filterName:'experienceType_boat', filterGroup: undefined, field: 'experienceType', operator: 'contains', operand : 'boat', label: 'boat' },
            { filterName:'experienceType_car', filterGroup: undefined, field: 'experienceType', operator: 'contains', operand : 'car', label: 'car' },
            { filterName:'experienceType_parachute', filterGroup: undefined, field: 'experienceType', operator: 'contains', operand : 'parachute', label: 'parachute' },
            { filterName:'experienceType_plane', filterGroup: undefined, field: 'experienceType', operator: 'contains', operand : 'plane', label: 'plane' }
        ];

        const expected = {
            priceRange1: createFilterStructure(filterConfigList[0]),
            priceRange2: createFilterStructure(filterConfigList[1]),
            experienceType_boat: createFilterStructure(dynamicFilterConfig[0]),
            experienceType_car: createFilterStructure(dynamicFilterConfig[1]),
            experienceType_parachute: createFilterStructure(dynamicFilterConfig[2]),
            experienceType_plane: createFilterStructure(dynamicFilterConfig[3]),
        };
        const filterStructureMap = getFilterStructureMap(universe, filterConfigList);
        return expect(filterStructureMap).resolves.toEqual(expected);
    });

});


describe('getFilterStructureByFilterGroup', () => {
	test('Should generate a filter config per operand found', async () => {
        const 
            filterConfigList = [
                { filterName:'priceRange1', filterGroup: 'price', field: 'price', operator: 'inRangeOpenClosed', operand : createInterval(0, 50) },
                { filterName:'priceRange2', filterGroup: 'price', field: 'price', operator: 'inRangeOpenClosed', operand: createInterval(50, 100) },
                { filterName:'boxType', filterGroup: 'boxType', field: 'boxType', operator: '===', operand: 1 },
                { filterName:'rating', field: 'rating', operator: '>', operand: 5 }
            ],
            universe = 'sejour';
        
        const
            filterStructureMap = {
                priceRange1: createFilterStructure(filterConfigList[0]),
                priceRange2: createFilterStructure(filterConfigList[1]),
                boxType: createFilterStructure(filterConfigList[2]),
                rating: createFilterStructure(filterConfigList[3]),
            },
            filterStructureByGroup = await getFilterStructureByFilterGroup(universe, filterConfigList);

        const expected = new Map()
                                .set('price', [filterStructureMap['priceRange1'], filterStructureMap['priceRange2']] )
                                .set('boxType', [filterStructureMap['boxType']] )
                                .set(undefined, [filterStructureMap['rating']] )
        return expect(filterStructureByGroup).toEqual(expected);
    });
});