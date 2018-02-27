import {filterObjectAgainstFilterGroup, filterObjectAgainstFilterFunctionListByGroup, filter } from '../filter';

describe('filterObjectAgainstFilterGroup', () => {
	test('Should return true when at least 1 function returns true', () => {
		const f1 = (target) => ( true );
		const f2 = (target) => ( false );
		const f3 = (target) => ( false );
		const filterGroupCollection = [f1, f2, f3];
		const result = filterObjectAgainstFilterGroup(filterGroupCollection)({});

		expect(result).toBe(true);

	});

	test('Should return false when all functions returns false', () => {
		const f1 = (target) => ( false );
		const f2 = (target) => ( false );
		const f3 = (target) => ( false );
		const filterGroupCollection = [f1, f2, f3];
		const result = filterObjectAgainstFilterGroup(filterGroupCollection)({});

		expect(result).toBe(false);		
	});					
});

describe('filterObjectAgainstFilterFunctionListByGroup', () => {
	test('Should return true all groups return true', () => {
		const f1G1 = (target) => ( true );
		const f2G1 = (target) => ( false );
		const f3G1 = (target) => ( true );
		const filterCollectionGroup1 = [f1G1, f2G1, f3G1];	

		const f1G2 = (target) => ( true );
		const f2G2 = (target) => ( false );
		const filterCollectionGroup2 = [f1G2, f2G2];

		const filterFunctionListMapped = new Map()
			.set(filterCollectionGroup1, 'group1')
			.set(filterCollectionGroup2, 'group2');

		const filterFunctionListByGroup = [filterCollectionGroup1, filterCollectionGroup2];
		const generator = filterObjectAgainstFilterFunctionListByGroup(filterFunctionListByGroup, filterFunctionListMapped)({});

		const valueIteration1 = generator.next().value;
		expect(valueIteration1).toEqual({pass: true});
	});

	test('Should return false when 1 group returns false, with the name of the group', () => {
		const f1G1 = (target) => ( true );
		const f2G1 = (target) => ( false );
		const f3G1 = (target) => ( true );
		const filterCollectionGroup1 = [f1G1, f2G1, f3G1];	

		const f1G2 = (target) => ( false );
		const f2G2 = (target) => ( false );
		const filterCollectionGroup2 = [f1G2, f2G2];

		const f1G3 = (target) => ( true );
		const filterCollectionGroup3 = [f1G3];

		const f1G4 = (target) => ( false );
		const filterCollectionGroup4 = [f1G4];

		const f1G5 = (target) => ( true );
		const f2G5 = (target) => ( false );
		const filterCollectionGroup5 = [f1G5, f2G5];

		const filterFunctionListMapped = new Map()
			.set(filterCollectionGroup1, 'group1')
			.set(filterCollectionGroup2, 'group2')
			.set(filterCollectionGroup3, 'group3')
			.set(filterCollectionGroup4, 'group4')
			.set(filterCollectionGroup5, 'group5');

		const filterFunctionListByGroup = [filterCollectionGroup1, filterCollectionGroup2, filterCollectionGroup3, filterCollectionGroup4, filterCollectionGroup5];
		const generator = filterObjectAgainstFilterFunctionListByGroup(filterFunctionListByGroup, filterFunctionListMapped)({});

		const valueIteration1 = generator.next().value;
		expect(valueIteration1).toEqual({pass: false, filterGroupRejected: 'group2'});

		const valueIteration2 = generator.next().value;
		expect(valueIteration2).toEqual({pass: false, filterGroupRejected: 'group4'});

		const valueIteration3 = generator.next().value;
		expect(valueIteration3).toEqual({pass: true});	
	});				
});