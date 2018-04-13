//@flow
import type { FilterName, FilterGroup, FilterCriteria, CreateFilterOperand, FilterOperand, FiltersSelectedState, FilterStructureMap, FilterConfig, FilterConfigList  } from '../types';
import { getAllUniqueKeysForIndex } from './idbStorage';
import { curry, compose, merge } from 'ramda';
import 'core-js/fn/array/includes.js';
import createFilterStructure from '../domainModel/filterStructure';
type GetOperandAsync = (universe: string, field: string) => Promise<FilterOperand>;


//!!!
const _getOperandsLocally = (field, universe, ): Promise<FilterOperand> => 
     getAllUniqueKeysForIndex({}, universe, field);
const getOperandsLocally = curry(_getOperandsLocally);



const _getOperand = (field: string, universe: string) => 
    getOperandsLocally(field, universe);
export const getOperand = curry(_getOperand);


const _generateFilterForEachOperand = async (universe: string, filterBaseInfos): Object => {
	const { filterBaseName, filterGroup, field, operator } = filterBaseInfos;
	const operandList = await getOperand(field, universe);

	return operandList.map(operand => {
		const filterName = `${filterBaseName}_${operand}`;
		return {filterName, filterGroup, field, operator, operand};
	});
}
export const generateFilterForEachOperand = curry(_generateFilterForEachOperand);


const _getFilterStructureMap = (universe: string, filterConfigList: FilterConfigList): Promise<FilterStructureMap> => {
    const reducer = (filterStructureMap: FilterStructureMap, filterConfig: FilterConfig) => {
        typeof filterConfig === 'function' 
        ? compose( merge(filterStructureMap), getFilterStructureMap(universe), filterConfig)(universe)
        : filterStructureMap[filterConfig.filterName] = createFilterStructure(filterConfig);

        return filterStructureMap;
    };

    return filterConfigList.reduce(reducer, {});
};
export const getFilterStructureMap = curry(_getFilterStructureMap);


export default getFilterStructureMap;
