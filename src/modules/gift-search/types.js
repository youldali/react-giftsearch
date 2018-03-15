
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

//FILTER STATE
export type Filters = { [FilterName]: FilterOperand};
