
//OPERATOR
export type Operator = 
    '<' | '<=' | '>' | '>=' | '==' | '===' | 
    'inRangeClosed' | 'inRangeOpen' | 'inRangeClosedOpen' | 'inRangeOpenClosed' |
    'isIncluded' | 'hasOneInCommon';

//FILTERS
export type FilterName = string;
export type FilterGroup = string;
export type FiltersGroupsCollection = { +[FilterName]: FilterGroup};

//FILTER CRITERIA
export type FilterOperand = number | string | number[] | string[];
export type FilterCriteria = {|field: string, operator: string, operand?: FilterOperand|};
export type FiltersCriteriasCollection = {+[FilterName]: FilterCriteria};
export type FilterConfig = {
	filtersCriterias: FiltersCriteriasCollection, 
	filtersGroups: FiltersGroupsCollection,
}

//FILTER STATE
export type Filters = { [FilterName]: FilterOperand};

//FILTER FUNCTION BUILDER
export type FilterFunction = (target: Object) => boolean;
export type FilterFunctionListByGroup = Array<FilterFunction[]>;
export type FilterTuple = [FilterName, FilterFunction];
export type FilterFunctionListMapped = Map<FilterFunction[], FilterGroup>;
export type FiltersData = {
	filterFunctionListByGroup: FilterFunctionListByGroup, 
	filterFunctionListMapped: FilterFunctionListMapped
}
export type FilteredObjectStatus = {|
	+pass: boolean,
	+filterGroupRejected?: FilterGroup
|};

//STORAGE IDB
export type IndexConfig = ?{|multiEntry?: boolean, unique?: boolean|};
export type FieldsToIndex = { [string]: IndexConfig };
export type FieldsToIndexByUniverse = { [string]: FieldsToIndex };