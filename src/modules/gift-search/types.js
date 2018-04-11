import type { Interval } from 'helpers/dataStruture/interval';
//OPERATOR
export type Operator = 
    '<' | '<=' | '>' | '>=' | '==' | '===' | 
    'inRangeClosed' | 'inRangeOpen' | 'inRangeClosedOpen' | 'inRangeOpenClosed' |
    'isIncluded' | 'hasOneInCommon';

//FILTERS
export type FilterName = string;
export type FilterGroup = string;
export type FiltersGroupsCollection = { +[FilterName]: FilterGroup};
export type FilterStructure = {
	filterName: FilterName,
	FilterGroup: FilterGroup,
	operator: string,
	field: string,
	operand: FilterOperand
};
export type FilterStructureMap = { [FilterName]: FilterStructure };

//FILTER CRITERIA
export type FilterOperand = number | string | number[] | string[] | Interval;
export type CreateFilterOperand = () => Promise<FilterOperand>;
export type FilterCriteria = {|field: string, operator: string, operand?: FilterOperand | CreateFilterOperand |};
export type FiltersCriteriasCollection = {+[FilterName]: FilterCriteria};
export type FilterConfig = {
	filtersCriterias: FiltersCriteriasCollection, 
	filtersGroups: FiltersGroupsCollection,
}

//FILTER STATE
export type FiltersSelectedState = { [FilterName]: FilterOperand};

//FILTER FUNCTION BUILDER
export type FilterFunction = (target: Object) => boolean;
export type FilterFunctionListByGroup = Array<FilterFunction[]>;
export type FilterTuple = [FilterName, FilterFunction];
export type FilterFunctionListMappedToFilterGroup = Map<FilterFunction[], FilterGroup>;
export type FiltersData = {
	filterFunctionListByGroup: FilterFunctionListByGroup, 
	filterFunctionListMappedToFilterGroup: FilterFunctionListMappedToFilterGroup
}
export type FilteredObjectStatus = {|
	+pass: boolean,
	+filterGroupRejected?: FilterGroup
|};

type FilteredObjectIdsMappedByGroup = Map<string | boolean, number[]>;

//STORAGE IDB
export type IndexConfig = ?{|multiEntry?: boolean, unique?: boolean|};
export type FieldsToIndex = { [string]: IndexConfig };
export type FieldsToIndexByUniverse = { [string]: FieldsToIndex };

//Filter statistic
export type FilterOperandStatistic = { type: 'absolute' | 'relative', idList: number[]};