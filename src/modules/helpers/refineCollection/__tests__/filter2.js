describe('filterObjectWithFilterGroup', () => {

	test('Should return true when at least 1 function returns true', () => {
		const f1 = (target) => ( true );
		const f2 = (target) => ( false );
		const f3 = (target) => ( false );
		const filterGroupCollection = [f1, f2, f3];
		const result = filterObjectWithFilterGroup(filterGroupCollection, {});

		expect(result).toBe(true);

	});

	test('Should return false when all functions returns false', () => {
		const f1 = (target) => ( false );
		const f2 = (target) => ( false );
		const f3 = (target) => ( false );
		const filterGroupCollection = [f1, f2, f3];
		const result = filterObjectWithFilterGroup(filterGroupCollection, {});

		expect(result).toBe(false);		
	});			
			
});
