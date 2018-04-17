//@flow
import type { FilterName, FilterGroup, FilterCriteria, CreateFilterOperand, FilterOperand, FiltersSelectedState, FilterStructureMap, FilterConfig, FilterConfigList  } from '../types';
import { getAllUniqueKeysForIndex } from './idbStorage';
import { curry, composeP, merge } from 'ramda';
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


const _generateFilterConfigForEachOperand = async (filterBaseInfos, universe: string): Promise<Object> => {
	const { filterBaseName, filterGroup, field, operator } = filterBaseInfos;
	const operandList = await getOperand(field, universe);

	return operandList.map(operand => {
		const filterName = `${filterBaseName}_${operand}`;
		return {filterName, filterGroup, field, operator, operand};
	});
}
export const generateFilterConfigForEachOperand = curry(_generateFilterConfigForEachOperand);


const _getFilterStructureMap = (universe: string, filterConfigList: FilterConfigList): Promise<FilterStructureMap> => {
    const reducer = async (filterStructureMapPromise: FilterStructureMap, filterConfig: FilterConfig) => {
        const filterStructureMap = await filterStructureMapPromise;

        typeof filterConfig === 'function' 
        ? filterStructureMapPromise = composeP( merge(filterStructureMap), getFilterStructureMap(universe), filterConfig )(universe)
        : filterStructureMap[filterConfig.filterName] = createFilterStructure(filterConfig);

        return filterStructureMapPromise;
    };

    return filterConfigList.reduce(reducer, Promise.resolve({}));
};
export const getFilterStructureMap = curry(_getFilterStructureMap);


export default getFilterStructureMap;
