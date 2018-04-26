import type { Interval } from 'helpers/dataStruture/interval';

//FILTERS
export type FilterName = string;
export type FilterGroup = ?string;
export type FilterOperand = number | string | number[] | string[] | Interval;
export type FilterStructure = {
	filterName: FilterName,
	FilterGroup: FilterGroup,
	operator: string,
	field: string,
	operand: FilterOperand
};
export type FilterStructureMap = { [FilterName]: FilterStructure };

//FILTER Config
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
export type FiltersAppliedState = { [FilterName]: FilterOperand};

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
export type IndexConfig = ?{multiEntry?: boolean, unique?: boolean};
export type FieldsToIndex = { [string]: IndexConfig };
export type FieldsToIndexByUniverse = { [string]: FieldsToIndex };

//Filter statistic
export type FilterOperandStatistic = { type: 'absolute' | 'relative', idList: number[]};


//BOX
export 
type Box = {
	id: string,
	activity_name: string,
	category: Array<string>,
	city: string,
	description: string,
	name: string,
	partner_name: string,
	price: string,
	ranking: number,
	rating: string,
	short_description: string,
	sku: string,
	store_id: string,
	subtitle: string,
	universe: Array<string>,
	special_price: string,
	url: string,
	img: string,
	show_rating: boolean,
	number_activities: number,
	reviews_count: number,
	type_experience: Array<string>,
	min_persons: number,
	max_persons: number,
	min_nights: number,
	max_nights: number,	
	rawPrice: number,
	web_exclusive: boolean
};

export
type BoxCollection = Box[];