import * as relatedFiltersHelper from '../relatedFilters';

const filterConfig = {
	'forOneNight': {
		filterGroup: 'nights' 
	},
	'forMutipleNights': {
		filterGroup: 'nights' 
	},
	'forPersonsRange': {
		filterGroup: 'person' 
	},
	'forPersons': {
		filterGroup: 'person'
	},
	'forPersons2': {
		filterGroup: 'person'
	},
	'maxPrice': {
	},
	'otherFilter': {
		filterGroup: 'other'
	}
};

describe('findRelatedFilters', function(){
	test('it should return the related filters for filterGroup: "person" AND filter: "forPersons" ', function(){
		const expectedRelatedFilters = ['forPersonsRange', 'forPersons2'];
		const relatedFilters = relatedFiltersHelper.findRelatedFilters(filterConfig, 'forPersons');
		expect(relatedFilters).toEqual(expectedRelatedFilters);
	});

	test('it should return empty array when no related filters are defined ', function(){
		const expectedRelatedFilters = [];
		const relatedFilters = relatedFiltersHelper.findRelatedFilters(filterConfig, 'otherFilter');
		expect(relatedFilters).toEqual(expectedRelatedFilters);
	});

	test('it should return empty array when no filterGroup is defined ', function(){
		const expectedRelatedFilters = [];
		const relatedFilters = relatedFiltersHelper.findRelatedFilters(filterConfig, 'maxPrice');
		expect(relatedFilters).toEqual(expectedRelatedFilters);
	});
});

describe('findMultipleRelatedFilters', function(){
	test('it should return the related filters for multiple filterGroups ', function(){
		const expectedRelatedFilters = ['forPersonsRange', 'forPersons', 'forOneNight'];
		const relatedFilters = relatedFiltersHelper.findMultipleRelatedFilters(filterConfig, ['forPersons2', 'forMutipleNights', 'otherFilter']);
		expect(relatedFilters).toEqual(expectedRelatedFilters);
	});

	test('it should return empty array when no related filters are defined ', function(){
		const expectedRelatedFilters = [];
		const relatedFilters = relatedFiltersHelper.findMultipleRelatedFilters(filterConfig, ['otherFilter', 'maxPrice']);
		expect(relatedFilters).toEqual(expectedRelatedFilters);
	});

});