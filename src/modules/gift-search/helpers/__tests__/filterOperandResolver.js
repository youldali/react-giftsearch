import { getIsFilterOperandSelected } from '../filterOperandResolver';
import createInterval from 'helpers/dataStruture/interval';

describe('getIsFilterOperandSelected', () => {
	test('Should return true if operand is selected', () => {
        const 
            filtersSelectedState = { priceRange1: createInterval(0, 100)},
            operand = createInterval(0, 100),
            filterName = 'priceRange1';

        const isFilterOperandSelected = getIsFilterOperandSelected(filtersSelectedState, filterName, operand);
		return expect(isFilterOperandSelected).toBe(true);
    });

    test('Should return false if operand is not selected', () => {
        const 
            filtersSelectedState = { priceRange2: createInterval(0, 100)},
            operand = createInterval(0, 100),
            filterName = 'priceRange1';

        const isFilterOperandSelected = getIsFilterOperandSelected(filtersSelectedState, filterName, operand);
		return expect(isFilterOperandSelected).toBe(false);
    });

    test('Should return true if operand is selected in the range of selected operand', () => {
        const 
            filtersSelectedState = { experienceType: ['boat', 'car']},
            operand = 'boat',
            filterName = 'experienceType';

        const isFilterOperandSelected = getIsFilterOperandSelected(filtersSelectedState, filterName, operand);
		return expect(isFilterOperandSelected).toBe(true);
    });

    test('Should return true if operand is selected in the range of selected operand', () => {
        const 
            filtersSelectedState = { experienceType: ['boat', 'car']},
            operand = 'bike',
            filterName = 'experienceType';

        const isFilterOperandSelected = getIsFilterOperandSelected(filtersSelectedState, filterName, operand);
		return expect(isFilterOperandSelected).toBe(false);
    });

});