import createFilterStructure from '../filterStructure';

describe('createFilterStructure', () => {
	test('Should return a filter structure', () => {
        const 
            filterConfig = { 
                filterName: 'priceRange1',
                filterGroup: 'price',
                field: 'price',
                operator: '>',
                operand: 200,
            },
            universe = 'sejour';
       
        const expectedStructure = {
            filterName,
            filterGroup,
            field,
            operator,
            operand
        };
        
        const filterStructure = createFilterStructure(universe, filterConfig);
		return expect(filterStructure).toEqual(expectedStructure);
    });
});