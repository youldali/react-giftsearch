import type { Interval } from 'helpers/dataStruture/interval';
//OPERATOR
export type Operator = 
    '<' | '<=' | '>' | '>=' | '==' | '===' | 
    'inRangeClosed' | 'inRangeOpen' | 'inRangeClosedOpen' | 'inRangeOpenClosed' |
    'isIncluded' | 'contains' | 'hasOneInCommon';

//FILTERS
export type FilterName = string;
export type FilterGroup = ?string;
export type FilterStructure = {
	filterName: FilterName,
	FilterGroup: FilterGroup,
	operator: string,
	field: string,
	operand: FilterOperand
};
export type FilterStructureMap = { [FilterName]: FilterStructure };

//FILTER Config
export type FilterOperand = number | string | number[] | string[] | Interval;
export type ResolveFilterOperand = (universe: string, field: string) => Promise<FilterOperand>;
export type FilterConfig = {
	filterName: FilterName,
	FilterGroup?: FilterGroup,
	operator: string,
	field: string,
	operand: FilterOperand | ResolveFilterOperand
};
export type FilterConfigList = FilterConfig[];

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