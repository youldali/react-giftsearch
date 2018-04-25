import getFilterOperandStatistic from '../filterOperandStatistic';

describe('getOrderedList', () => {
	test('Should return the filter operand statistic for independent filter', () => {
        const 
            itemIdListMatchingOperandOnly = [5, 6, 7, 8, 9, 10, 20, 21, 22, 23, 24, 25],
            filterGroup = undefined,
            isOperandSelected = false,
            filteredObjectIdsMappedByGroup = new Map();

        filteredObjectIdsMappedByGroup
            .set(true, [7, 8, 10, 11, 12, 14, 24, 35]);
            
        const 
            filterOperandStats = getFilterOperandStatistic(filteredObjectIdsMappedByGroup, itemIdListMatchingOperandOnly, isOperandSelected, filterGroup),
            expected = {
                type: 'absolute',
                idList: [7, 8, 10, 24]
            };
		return expect(filterOperandStats).toEqual(expected);
    });

    test('Should return the filter operand statistic for group filter not selected', () => {
        const 
            itemIdListMatchingOperandOnly = [5, 6, 7, 8, 9, 10, 20, 21, 22, 23, 24, 25],
            filterGroup = 'price',
            isOperandSelected = false,
            filteredObjectIdsMappedByGroup = new Map();

        filteredObjectIdsMappedByGroup
            .set(true, [7, 8, 10, 11, 12, 14, 24, 35])
            .set('price', [22, 23, 25, 50, 51]);
            
        const 
            filterOperandStats = getFilterOperandStatistic(filteredObjectIdsMappedByGroup, itemIdListMatchingOperandOnly, isOperandSelected, filterGroup),
            expected = {
                type: 'relative',
                idList: [22, 23, 25]
            };
		return expect(filterOperandStats).toEqual(expected);
    });

    test('Should return the filter operand statistic for group filter selected', () => {
        const 
            itemIdListMatchingOperandOnly = [5, 6, 7, 8, 9, 10, 20, 21, 22, 23, 24, 25],
            filterGroup = 'price',
            isOperandSelected = true,
            filteredObjectIdsMappedByGroup = new Map();

        filteredObjectIdsMappedByGroup
            .set(true, [7, 8, 10, 11, 12, 14, 24, 35])
            .set('price', [22, 23, 25, 50, 51]);
            
        const 
            filterOperandStats = getFilterOperandStatistic(filteredObjectIdsMappedByGroup, itemIdListMatchingOperandOnly, isOperandSelected, filterGroup),
            expected = {
                type: 'absolute',
                idList: [7, 8, 10, 24]
            };
		return expect(filterOperandStats).toEqual(expected);
    });

    test('Should return the filter operand statistic for group filter when no other filter in group is selected', () => {
        const 
            itemIdListMatchingOperandOnly = [5, 6, 7, 8, 9, 10, 20, 21, 22, 23, 24, 25],
            filterGroup = 'price',
            isOperandSelected = true,
            filteredObjectIdsMappedByGroup = new Map();

        filteredObjectIdsMappedByGroup
            .set(true, [7, 8, 10, 11, 12, 14, 24, 35]);
                        
        const 
            filterOperandStats = getFilterOperandStatistic(filteredObjectIdsMappedByGroup, itemIdListMatchingOperandOnly, isOperandSelected, filterGroup),
            expected = {
                type: 'absolute',
                idList: [7, 8, 10, 24]
            };
		return expect(filterOperandStats).toEqual(expected);
    });
});
