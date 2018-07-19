// @flow
import type { FilterConfig, FilterConfigList } from '../types';
import createInterval from 'helpers/dataStructure/interval';
import { generateFilterConfigForEachOperand } from '../configHelpers/filterConfigResolver';

const filterConfigBase: FilterConfigList = [
	{ filterName:'priceRange1', filterGroup: 'price', field: 'price', operator: 'inRangeOpenClosed', operand : createInterval(0, 50), label: 'De 0€ à 50€' },
	{ filterName:'priceRange2', filterGroup: 'price', field: 'price', operator: 'inRangeOpenClosed', operand: createInterval(50, 100), label: 'De 50€ à 100€' },
	{ filterName:'priceRange3', filterGroup: 'price', field: 'price', operator: 'inRangeOpenClosed', operand: createInterval(100, 200), label: 'De 100€ à 200€' },
	{ filterName:'priceRange4', filterGroup: 'price', field: 'price', operator: '>', operand: 200, label: 'Plus de 200€' } ,

	{ filterName:'solo', filterGroup: 'forPeople', field: 'forPeople', operator: 'contains', operand: 'solo', label: 'Experience solitaire' } ,
	{ filterName:'couple', filterGroup: 'forPeople', field: 'forPeople', operator: 'contains', operand: 'couple', label: 'Experience á 2' } ,
	{ filterName:'group', filterGroup: 'forPeople', field: 'forPeople', operator: 'contains', operand: 'group', label: 'Experience en groupe' } ,
	
	generateFilterConfigForEachOperand({ filterBaseName: 'experienceType', field: 'experienceTypes', operator: 'contains', filterGroup: 'experienceType'}),

	generateFilterConfigForEachOperand({ filterBaseName: 'boxType', field: 'boxType', operator: 'contains', filterGroup: 'boxType'}),
];

export
const adventure: FilterConfigList = [
	...filterConfigBase,
	{ filterName:'extreme', field: 'extreme', operator: '===', operand: 1, label: 'Intensité' }
];

export
const sejour: FilterConfigList = [
	...filterConfigBase,
	{ filterName:'oneNight', filterGroup: 'night', field: 'numberOfNights', operator: '===', operand: 1, label: 'Une nuit' },
	{ filterName:'twoNight', filterGroup: 'night', field: 'numberOfNights', operator: '===', operand: 2 , label: 'Deux nuit' },
];

export
const mock1000: FilterConfigList = [
	...filterConfigBase,
	{ filterName:'oneNight', filterGroup: 'night', field: 'numberOfNights', operator: '===', operand: 1, label: 'Une nuit' },
	{ filterName:'twoNight', filterGroup: 'night', field: 'numberOfNights', operator: '===', operand: 2 , label: 'Deux nuit' },
];

export default
{
	adventure,
	sejour,
	"mock-1000": mock1000,
};