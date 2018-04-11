import createFilterStructure from '../filterStructure';

describe('createFilterStructure', () => {
	test('Should return a filter structure for synchronous operand', () => {
        const 
            filterName = 'priceRange1',
            filterGroup = 'price',
            field = 'price',
            operator = '>',
            operand = 200,
            universe = 'sejour';
       
        const expectedStructure = {
            filterName,
            filterGroup,
            field,
            operator,
            operand
        };
        
        const filterStructure = createFilterStructure(universe, filterName, filterGroup, {field, operator, operand});
		return expect(filterStructure).resolves.toEqual(expectedStructure);
    });

    test('Should return a filter structure for asynchronous operand', () => {
        const 
            filterName = 'experienceType',
            filterGroup = undefined,
            field = 'experienceType',
            operator = 'hasOneInCommon',
            operand = () => Promise.resolve(['bike', 'car']),
            universe = 'sejour';
       
        const expectedStructure = {
            filterName,
            filterGroup,
            field,
            operator,
            operand: ['bike', 'car']
        };
        
        const filterStructure = createFilterStructure(universe, filterName, filterGroup, {field, operator, operand})
		return expect(filterStructure).resolves.toEqual(expectedStructure);
    });
});