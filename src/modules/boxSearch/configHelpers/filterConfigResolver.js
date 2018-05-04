//@flow
import type { FilterBaseInfos, FilterConfig, FilterConfigList, FilterStructureMap } from '../types';

import { getOperandList as getOperandListFromIDB } from '../services/idbStorageService';
import { curry, composeP, merge } from 'ramda';
import createFilterStructure from '../domainModel/filterStructure';


const _getOperandList = (universe: string, field: string) => 
    getOperandListFromIDB(universe, field);
export const getOperandList = curry(_getOperandList);


const _generateFilterConfigForEachOperand = async (filterBaseInfos: FilterBaseInfos, universe: string): Promise<Object> => {
	const { filterBaseName, filterGroup, field, operator } = filterBaseInfos;
	const operandList = await getOperandList(universe, field);

	return operandList.map(operand => {
		const filterName = `${filterBaseName}_${operand}`;
		return {filterName, filterGroup, field, operator, operand};
	});
}
export const generateFilterConfigForEachOperand = curry(_generateFilterConfigForEachOperand);


const _getFilterStructureMap = (universe: string, filterConfigList: FilterConfigList): Promise<FilterStructureMap> => {
    const reducer = async (filterStructureMapPromise: Promise<Object>, filterConfig: FilterConfig) => {
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
