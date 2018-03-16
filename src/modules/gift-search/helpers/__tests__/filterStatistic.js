import { createFilterStatisticStructure, findNumberOfItemMatchingFilter } from '../filterStatistic';

describe('filterStatistic', () => {
	test('Should return the proper statistic of each status', () => {
        const statisticStructure = createFilterStatisticStructure();

        statisticStructure.addFilteredObjectStatus({pass: true}, 1);
        statisticStructure.addFilteredObjectStatus({pass: true}, 5);
        statisticStructure.addFilteredObjectStatus({pass: true}, 10);
        statisticStructure.addFilteredObjectStatus({pass: true}, 15);

        statisticStructure.addFilteredObjectStatus({pass: false}, 2);
        statisticStructure.addFilteredObjectStatus({pass: false}, 3);
        statisticStructure.addFilteredObjectStatus({pass: false}, 4);

        statisticStructure.addFilteredObjectStatus({pass: false, filterGroupRejected: 'group1'}, 6);
        statisticStructure.addFilteredObjectStatus({pass: false, filterGroupRejected: 'group1'}, 7);
        statisticStructure.addFilteredObjectStatus({pass: false, filterGroupRejected: 'group1'}, 8);
        statisticStructure.addFilteredObjectStatus({pass: false, filterGroupRejected: 'group1'}, 9);

        statisticStructure.addFilteredObjectStatus({pass: false, filterGroupRejected: 'group2'}, 11);
        statisticStructure.addFilteredObjectStatus({pass: false, filterGroupRejected: 'group2'}, 12);
        statisticStructure.addFilteredObjectStatus({pass: false, filterGroupRejected: 'group2'}, 13);
        statisticStructure.addFilteredObjectStatus({pass: false, filterGroupRejected: 'group2'}, 14);

        const expectedMap = new Map();
        expectedMap
            .set(true, [1,5,10,15])
            .set(false, [2,3,4])
            .set('group1', [6,7,8,9])
            .set('group2', [11,12,13,14]);

        expect(statisticStructure.getfilteredObjectIdsMappedByGroup()).toEqual(expectedMap);
	});
});

describe('findNumberOfItemMatchingFilter', () => {
    const filteredObjectIdsMappedByGroup = new Map();
    filteredObjectIdsMappedByGroup        
        .set(true, [1, 5, 10, 15, 20, 21, 22, 40, 50, 100, 101, 102, 103])
        .set(false, [2,3,4,5])
        .set('group1', [6, 7, 8, 9, 200, 201, 202, 203, 204, 205])
        .set('group2', [11, 12 ,13, 14, 20, 21, 22, 23, 24, 25]);

	test('Should return the proper number of item matching a filter without group, and unselected', () => {
        const listOfIdsMatchingFilter = [1, 2, 3, 10, 11, 20, 30, 31, 32, 33, 34, 35];
      
        const result = findNumberOfItemMatchingFilter(filteredObjectIdsMappedByGroup, listOfIdsMatchingFilter, undefined, false);
        expect(result).toEqual([1, 10, 20]);
    });
    
    test('Should return the proper number of item matching a filter without group, and selected', () => {
        const listOfIdsMatchingFilter = [1, 2, 3, 10, 11, 20, 30, 31, 32, 33, 34, 35];
      
        const result = findNumberOfItemMatchingFilter(filteredObjectIdsMappedByGroup, listOfIdsMatchingFilter, undefined, true);
        expect(result).toEqual([1, 10, 20]);
    });
    
    test('Should return the proper number of item matching a filter with a group, and unselected', () => {
        const listOfIdsMatchingFilter = [1, 2, 3, 200, 201, 205];
      
        const result = findNumberOfItemMatchingFilter(filteredObjectIdsMappedByGroup, listOfIdsMatchingFilter, 'group1', false);
        expect(result).toEqual([200, 201, 205]);
    });

    test('Should return the proper number of item matching a filter with a group, and selected', () => {
        const listOfIdsMatchingFilter = [1, 2, 3, 200, 201, 205];
      
        const result = findNumberOfItemMatchingFilter(filteredObjectIdsMappedByGroup, listOfIdsMatchingFilter, 'group1', true);
        expect(result).toEqual([1]);
    });

});