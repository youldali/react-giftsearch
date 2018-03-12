// @flow

import type { FilterName, FilterOperand, Operator } from 'modules/actions/types';

export type FilterGroup = string;
export type FilterCriteria = {|field: string, operator: string, operand?: FilterOperand|};
export type FiltersCriteriasCollection = {+[FilterName]: FilterCriteria};
export type FiltersGroupsCollection = { +[string]: string};

export type FilterConfig = {
	filtersCriterias: FiltersCriteriasCollection, 
	filtersGroups: FiltersGroupsCollection,
}

export
const filterConfigBase: FilterConfig = {
	filtersCriterias: {
		priceRange1: { field: 'price', operator: 'inRangeOpenClosed', operand : [0, 50]},
        priceRange2: { field: 'price', operator: 'inRangeOpenClosed', operand: [50, 100]},
        priceRange3: { field: 'price', operator: 'inRangeOpenClosed', operand: [100, 200]},
        priceRange4: { field: 'price', operator: '>', operand: 200} ,

        forOnePerson: { field: 'forOnePerson', operator: '===', operand: 1 },
        forCouple: { field: 'forCouple', operator: '===', operand: 1 },

        excluWeb: { field: 'webExclusive', operator: '===', operand: 1 },
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
		extreme: { field: 'extreme', operator: '===', operand: 1 }
	},

	filtersGroups: {
		...filterConfigBase.filtersGroups
	},
};

const filterConfigSejour: FilterConfig = {
	filtersCriterias: {
		...filterConfigBase.filtersCriterias,
		oneNight: { field: 'oneNight', operator: '===', operand: 1 },
		twoNight: { field: 'twoNight', operator: '===', operand: 1 },
	},

	filtersGroups: {
		...filterConfigBase.filtersGroups,
		oneNight: 'night',
		twoNight: 'night',
	},
};
