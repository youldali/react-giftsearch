// @flow

import type { FilterValue } from 'modules/actions/types';
export type FilterCriteria = {|field: string, operator: string, value?: FilterValue|};
export type FiltersCriteriasCollection = {+[string]: $ReadOnlyArray<FilterCriteria>};
export type FiltersGroupsCollection = { +[string]: string};

export type UniverseToUrlMap = {+[string]: Array<number>};
export type FieldsToKeep = $ReadOnlyArray<string>;

export
const universeToUrlMap: UniverseToUrlMap = {
	"well-being": [844, 864, 846],
	"gastronomy": [853, 858, 859, 861, 871, 860, 884, 923],
	"adventure": [851, 867, 850, 887, 879, 849, 855],
	"occasion": [873, 883, 877, 882, 870, 934],
	"voyage": [29, 855, 863, 865, 875, 876, 878, 866]
}

export 
const cloudSearchConfig = 
{
	"baseUrl": "//www.smartbox.com/fr/cloudsearch/search/thematic/?sortby=position&pagesize=1000",
	"universeToUrlMap": universeToUrlMap
};

export 
const localforageConfig = {
	name: 'gift-finder-storage'
};



const fieldsToKeep: FieldsToKeep = [
	'id',
	'activity_name',
	'category',
	'city',
	'description',
	'name',
	'partner_name',
	'price',
	'ranking',
	'rating',
	'short_description',
	'sku',
	'store_id',
	'subtitle',
	'universe',
	'special_price',
	'url',
	'img',
	'show_rating',
	'number_activities',
	'reviews_count',
	'type_experience',
	'web_exclusive'
];

export 
const formatGiftConfig = {
	fieldsToKeep: fieldsToKeep,
	oneNight: 'Une nuit',
	twoNights: 'Deux nuits'
};

export
const filterConfig: {filtersCriterias: FiltersCriteriasCollection, filtersGroups: FiltersGroupsCollection} = {
	filtersCriterias: {
		maxPrice: [{ 'field': 'rawPrice', 'operator': '<=' }],
		minPrice: [{ 'field': 'rawPrice', 'operator': '>=' }],
		forPersonsRange: [{ 'field': 'min_persons', 'operator': '<=' }, { 'field': 'max_persons', 'operator': '>=' }],
		forOnePerson: [{ 'field': 'min_persons', 'operator': '===', 'value': 1 }, { 'field': 'max_persons', 'operator': '>=', 'value': 1 }],
		forCouple: [{ 'field': 'min_persons', 'operator': '===', 'value': 2 }, { 'field': 'max_persons', 'operator': '===', 'value': 2 }],
		mostPopular: [{ 'field': 'show_rating', 'operator': '===', 'value': true }, { 'field': 'rating', 'operator': '>=', 'value': '8' }],
		excluWeb: [{ 'field': 'web_exclusive', 'operator': '===', 'value': true }],
		elasticSearch: [{ 'field': 'id', 'operator': 'isIncluded'}]
	},

	filtersGroups: {
		forPersonsRange: 'person',
		forOnePerson: 'person',
		forCouple: 'person',
	}
};


