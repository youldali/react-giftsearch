// @flow

import type { FilterValue } from 'modules/actions/types';

export type FilterGroup = string;
export type FilterCriteria = {|field: string, operator: string, value?: FilterValue|};
export type FiltersCriteriasCollection = {+[string]: $ReadOnlyArray<FilterCriteria>};
export type FiltersGroupsCollection = { +[string]: string};

export type FilterConfig = {
	filtersCriterias: FiltersCriteriasCollection, 
	filtersGroups: FiltersGroupsCollection,
}

export
const filterConfigBase: FilterConfig = {
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
	},
};

const filterConfigAdventure: FilterConfig = {
	filtersCriterias: {
		...filterConfigBase.filtersCriterias,
		extreme: [{ 'field': 'extreme', 'operator': '<=' }],
	},

	filtersGroups: {
		...filterConfigBase.filtersGroups
	},
};

const filterConfigSejour: FilterConfig = {
	filtersCriterias: {
		...filterConfigBase.filtersCriterias,
		oneNight: [{ 'field': 'oneNight', 'operator': '===', 'value': true }],
		twoNight: [{ 'field': 'twoNight', 'operator': '===', 'value': true }],
		theme: [{ 'field': 'theme', 'operator': 'isIncluded' }]
	},

	filtersGroups: {
		...filterConfigBase.filtersGroups,
		oneNight: 'night',
		twoNight: 'night',
	},
};


