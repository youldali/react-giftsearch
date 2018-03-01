import { createFilterStatisticStructure } from '../filterStatistic';

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

        expect(statisticStructure.getLoggerMap()).toEqual(expectedMap);
	});
	
});