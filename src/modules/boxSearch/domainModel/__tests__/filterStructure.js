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
            filterName: filterConfig.filterName,
            filterGroup: filterConfig.filterGroup,
            field: filterConfig.field,
            operator: filterConfig.operator,
            operand: filterConfig.operand
        };
        
        const filterStructure = createFilterStructure(filterConfig);
		return expect(filterStructure).toEqual(expectedStructure);
    });
});