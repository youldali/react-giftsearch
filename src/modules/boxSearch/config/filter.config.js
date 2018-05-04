// @flow
import type { FilterConfig, FilterConfigList } from '../types';
import createInterval from 'helpers/dataStructure/interval';
import { generateFilterConfigForEachOperand } from '../helpers/filterConfigResolver';

const filterConfigBase: FilterConfigList = [
	{ filterName:'priceRange1', filterGroup: 'price', field: 'price', operator: 'inRangeOpenClosed', operand : createInterval(0, 50) },
	{ filterName:'priceRange2', filterGroup: 'price', field: 'price', operator: 'inRangeOpenClosed', operand: createInterval(50, 100) },
	{ filterName:'priceRange3', filterGroup: 'price', field: 'price', operator: 'inRangeOpenClosed', operand: createInterval(100, 200) },
	{ filterName:'priceRange4', filterGroup: 'price', field: 'price', operator: '>', operand: 200 } ,
	
	{ filterName:'forOnePerson', filterGroup: 'person', field: 'forOnePerson', operator: '===', operand: 1 },
	{ filterName:'forCouple', filterGroup: 'person', field: 'forCouple', operator: '===', operand: 1 },
	
	generateFilterConfigForEachOperand({ filterBaseName: 'experienceType', field: 'experienceType', operator: 'contains'})
];

export
const adventure: FilterConfigList = [
	...filterConfigBase,
	{ filterName:'extreme', field: 'extreme', operator: '===', operand: 1 }
];

export
const sejour: FilterConfigList = [
	...filterConfigBase,
	{ filterName:'oneNight', filterGroup: 'night', field: 'oneNight', operator: '===', operand: 1 },
	{ filterName:'twoNight', filterGroup: 'night', field: 'twoNight', operator: '===', operand: 1 },
];

export default
{
	adventure,
	sejour
}
