// @flow

import type { FilterName, FilterValue, Operator } from 'modules/actions/types';

export type FilterGroup = string;
export type FilterCriteria = {|field: string, operator: string, value?: FilterValue|};
export type FiltersCriteriasCollection = {+[FilterName]: FilterCriteria};
export type FiltersGroupsCollection = { +[string]: string};

export type FilterConfig = {
	filtersCriterias: FiltersCriteriasCollection, 
	filtersGroups: FiltersGroupsCollection,
}

export
const filterConfigBase: FilterConfig = {
	filtersCriterias: {
		priceRange1: { field: 'price', operator: 'inRangeOpenClosed', value: [0, 50]},
        priceRange2: { field: 'price', operator: 'inRangeOpenClosed', value: [50, 100]},
        priceRange3: { field: 'price', operator: 'inRangeOpenClosed', value: [100, 200]},
        priceRange4: { field: 'price', operator: '>', value: 200} ,

        forOnePerson: { field: 'forOnePerson', operator: '===', value: 1 },
        forCouple: { field: 'forCouple', operator: '===', value: 1 },

        excluWeb: { field: 'webExclusive', operator: '===', value: 1 },
        experienceType: { field: 'experienceType', operator: 'hasOneInCommon' }
	},

	filtersGroups: {
		priceRange1: 'price',
		priceRange2: 'price',
		priceRange3: 'price',
		priceRange4: 'price',

		forOnePerson: 'person',
		forCouple: 'person',
	},
};

const filterConfigAdventure: FilterConfig = {
	filtersCriterias: {
		...filterConfigBase.filtersCriterias,
		extreme: { field: 'extreme', operator: '===', value: 1 }
	},

	filtersGroups: {
		...filterConfigBase.filtersGroups
	},
};

const filterConfigSejour: FilterConfig = {
	filtersCriterias: {
		...filterConfigBase.filtersCriterias,
		oneNight: { field: 'oneNight', operator: '===', value: 1 },
		twoNight: { field: 'twoNight', operator: '===', value: 1 },
	},

	filtersGroups: {
		...filterConfigBase.filtersGroups,
		oneNight: 'night',
		twoNight: 'night',
	},
};
