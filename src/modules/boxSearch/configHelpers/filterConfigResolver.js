//@flow
import type { FilterBaseInfos, FilterConfig, FilterConfigList, FilterStructureByFilterGroup, FilterStructure, FilterStructureMap } from '../types';

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
        const 
            filterName = `${filterBaseName}_${operand}`,
            label = operand;

		return {filterName, filterGroup, field, operator, operand, label};
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


export
const transformToFilterStructureByGroup = (filterStructureMap: FilterStructureMap): FilterStructureByFilterGroup => {
    const filterStructureByFilterGroup = new Map();

    Object.values(filterStructureMap).forEach( filterStructure => {
        const 
            {filterGroup} = ((filterStructure: any): FilterStructure),
            filterStructureList = filterStructureByFilterGroup.get(filterGroup) || filterStructureByFilterGroup.set(filterGroup, []).get(filterGroup);

        //$FlowFixMe
        filterStructureList.push(filterStructure);
    });

    return filterStructureByFilterGroup;
};

export
const _getFilterStructureByFilterGroup = (universe: string, filterConfigList: FilterConfigList): Promise<FilterStructureByFilterGroup> => 
    composeP(transformToFilterStructureByGroup, getFilterStructureMap(universe))(filterConfigList);
export const getFilterStructureByFilterGroup = curry(_getFilterStructureByFilterGroup);


export default getFilterStructureMap;
