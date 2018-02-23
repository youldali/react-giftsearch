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


describe('filterObjectWithIndependentFilters', () => {

	test('Should return true when all function are true', () => {
		const f1 = (target) => ( true );
		const f2 = (target) => ( true );
		const f3 = (target) => ( true );
		const filterGroupCollection = [f1, f2, f3];
		const result = filterObjectWithIndependentFilters(filterGroupCollection, {});

		expect(result).toBe(true);

	});

	test('Should return false at least 1 function returns false', () => {
		const f1 = (target) => ( true );
		const f2 = (target) => ( false );
		const f3 = (target) => ( true );
		const filterGroupCollection = [f1, f2, f3];
		const result = filterObjectWithIndependentFilters(filterGroupCollection, {});

		expect(result).toBe(false);		
	});			
			
});


describe('filterObjectWithFilterCollection', () => {

	test('Should return true all groups return true', () => {
		const f1G1 = (target) => ( true );
		const f2G1 = (target) => ( false );
		const f3G1 = (target) => ( true );
		const filterCollectionGroup1 = [f1G1, f2G1, f3G1];	

		const f1G2 = (target) => ( true );
		const f2G2 = (target) => ( false );
		const filterCollectionGroup2 = [f1G2, f2G2];

		const filterCollection = new Map()
			.set('group 1', filterCollectionGroup1)
			.set('group 2', filterCollectionGroup2);

		const result = filterObjectWithFilterCollection(filterCollection)({});
		expect(result).toBe(true);		
	});

	test('Should return true all groups return true and independent filters return true', () => {
		const f1G1 = (target) => ( true );
		const f2G1 = (target) => ( false );
		const f3G1 = (target) => ( true );
		const filterCollectionGroup1 = [f1G1, f2G1, f3G1];	

		const f1G2 = (target) => ( true );
		const f2G2 = (target) => ( false );
		const filterCollectionGroup2 = [f1G2, f2G2];

		const f1G3 = (target) => ( true );
		const f2G3 = (target) => ( true );
		const filterCollectionGroup3 = [f1G3, f2G3];		

		const filterCollection = new Map()
			.set('group 1', filterCollectionGroup1)
			.set('group 2', filterCollectionGroup2)
			.set(undefined, filterCollectionGroup3);

		const result = filterObjectWithFilterCollection(filterCollection)({});
		expect(result).toBe(true);		
	});

	test('Should return false when 1 group returns false', () => {
		const f1G1 = (target) => ( true );
		const f2G1 = (target) => ( false );
		const f3G1 = (target) => ( true );
		const filterCollectionGroup1 = [f1G1, f2G1, f3G1];	

		const f1G2 = (target) => ( false );
		const f2G2 = (target) => ( false );
		const filterCollectionGroup2 = [f1G2, f2G2];

		const filterCollection = new Map()
			.set('group 1', filterCollectionGroup1)
			.set('group 2', filterCollectionGroup2);

		const result = filterObjectWithFilterCollection(filterCollection)({});
		expect(result).toBe(false);			
	});		

	test('Should return false when 1 independent filter returns false', () => {
		const f1G1 = (target) => ( true );
		const f2G1 = (target) => ( true );
		const f3G1 = (target) => ( true );
		const filterCollectionGroup1 = [f1G1, f2G1, f3G1];	

		const f1G2 = (target) => ( true );
		const f2G2 = (target) => ( true );
		const filterCollectionGroup2 = [f1G2, f2G2];

		const f1G3 = (target) => ( true );
		const f2G3 = (target) => ( false );
		const filterCollectionGroup3 = [f1G3, f2G3];		

		const filterCollection = new Map()
			.set('group 1', filterCollectionGroup1)
			.set('group 2', filterCollectionGroup2)
			.set(undefined, filterCollectionGroup3);

		const result = filterObjectWithFilterCollection(filterCollection)({});
		expect(result).toBe(false);		
	});		
			
});

describe('filter', () => {

	test('it should only objects with price <= 300', () => {
		const filters = {'maxPrice': 300};
		const expectedCollection = [gift1, gift5];
		const filteredCollection = filter(giftCollection, filters, criteriasCollection);
		expect(filteredCollection).toEqual(expectedCollection);
	});

	test('it should return objects price <= 500', () => {
		const filters = {'maxPrice': 500};
		const expectedCollection = [gift1, gift2, gift5];
		const filteredCollection = filter(giftCollection, filters, criteriasCollection);
		expect(filteredCollection).toEqual(expectedCollection);
	});

	test('it should return objects for couples', () => {
		const filters = {'forCouple': true};
		const expectedCollection = [gift2, gift5];
		const filteredCollection = filter(giftCollection, filters, criteriasCollection);
		expect(filteredCollection).toEqual(expectedCollection);
	});		

	test('it should return objects for 4 persons', () => {
		const filters = {'forPersonsRange': 4};
		const expectedCollection = [gift3, gift6];
		const filteredCollection = filter(giftCollection, filters, criteriasCollection);
		expect(filteredCollection).toEqual(expectedCollection);
	});		

	test('it should return objects for solo OR couples', () => {
		const filters = {
			'forPersonsSoloOnly': true,
			'forCouple': true
		};
		const expectedCollection = [gift1, gift2, gift4, gift5];
		const filteredCollection = filter(giftCollection, filters, criteriasCollection);
		expect(filteredCollection).toEqual(expectedCollection);
	});	

	test('it should return objects for solo OR couples and Price between 200 and 400', () => {
		const filters = {
			'forPersonsSoloOnly': true,
			'forCouple': true,
			'minPrice': 200,
			'maxPrice': 400
		};
		const expectedCollection = [gift1, gift2];
		const filteredCollection = filter(giftCollection, filters, criteriasCollection);
		expect(filteredCollection).toEqual(expectedCollection);
	});

	test('it should return objects for solo OR couples and id in (1, 5)', () => {
		const filters = {
			'forPersonsSoloOnly': true,
			'forCouple': true,
			'id': [1, 5],
		};
		const expectedCollection = [gift1, gift5];
		const filteredCollection = filter(giftCollection, filters, criteriasCollection);
		expect(filteredCollection).toEqual(expectedCollection);
	});

	test('it should return objects for solo OR couples AND id in (1, 5) AND city is Paris', () => {
		const filters = {
			'forPersonsSoloOnly': true,
			'forCouple': true,
			'id': [1, 5],
			'city': 'Paris'
		};
		const expectedCollection = [gift1];
		const filteredCollection = filter(giftCollection, filters, criteriasCollection);
		expect(filteredCollection).toEqual(expectedCollection);
	});

	test('it should return objects in Paris Or Lyon', () => {
		const filters = {
			'cityLyon': true,
			'city': 'Paris'
		};
		const expectedCollection = [gift1, gift2, gift4, gift6];
		const filteredCollection = filter(giftCollection, filters, criteriasCollection);
		expect(filteredCollection).toEqual(expectedCollection);
	});	

	test('it should whole collection when no filter provided', () => {
		const filters = {};
		const expectedCollection = giftCollection;
		const filteredCollection = filter(giftCollection, filters, criteriasCollection);
		expect(filteredCollection).toEqual(expectedCollection);
	});		

	test('it should empty when field in not defined', () => {
		const filters = {'error': true};
		const expectedCollection = [];
		const filteredCollection = filter(giftCollection, filters, criteriasCollection);
		expect(filteredCollection).toEqual(expectedCollection);
	});			

});