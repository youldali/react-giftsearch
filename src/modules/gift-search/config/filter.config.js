// @flow

import type { FilterName, FilterOperand, Operator, FilterConfig } from '../types';

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

export
const adventure: FilterConfig = {
	filtersCriterias: {
		...filterConfigBase.filtersCriterias,
		extreme: { field: 'extreme', operator: '===', operand: 1 }
	},

	filtersGroups: {
		...filterConfigBase.filtersGroups
	},
};

export
const sejour: FilterConfig = {
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

export default
{
	adventure,
	sejour
}