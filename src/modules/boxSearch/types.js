//@flow

import type { BoxListState } from './reducers/boxList';
import type { DisplayByState } from './reducers/displayBy';
import type { FilterAppliedState } from './reducers/filtersApplied';
import type { BoxesStatisticsState } from './reducers/boxesStatistics';
import type { OrderByState } from './reducers/orderBy';
import type { PageState } from './reducers/page';

//FILTER
export type UniverseName = string;
export type FilterName = string;
export type FilterGroup = string;
export type FilterOperand = number | string | number[] | string[] | Interval;

//STATE
export type FiltersApplied = { +[FilterName]: FilterOperand};
export type BoxSearchModuleState = {|
	boxesStatistics: BoxesStatisticsState,
	boxList: BoxListState,
	displayBy: DisplayByState,
	filtersApplied: FilterAppliedState,
	orderBy: OrderByState,
	page: PageState,
|};

//FILTER CONFIG
export type FilterBaseInfos = {
	filterBaseName: FilterName,
	filterGroup: FilterGroup,
	operator: string,
	field: string,
};
export type FilterConfig = {
	filterName: FilterName,
	filterGroup?: FilterGroup,
	operator: string,
	field: string,
	operand: FilterOperand | ResolveFilterOperand,
	label: string
};
export type FilterConfigList = FilterConfig[];

//FILTER BLOCK CONFIG
export type FilterBlockConfig = {
	label: string
};
export type FilterBlockConfigByFilterGroup = {
	[FilterGroup]: FilterBlockConfig
};
export type FilterBlockConfigByUniverse = {
	[UniverseName]: ProxyObject<FilterBlockConfigByFilterGroup>
}


//FILTER RESOLVER
export type FilterStructure = {|
	filterName: FilterName,
	filterGroup: ?FilterGroup,
	operator: string,
	field: string,
	operand: FilterOperand,
	label: string
|};
export type FilterStructureMap = { [FilterName]: FilterStructure };
export type FilterStructureByFilterGroup = Map<?string, FilterStructure[]>;
export type ResolveFilterOperand = (universe: string, field: string) => Promise<FilterOperand>;


//FILTER FUNCTION BUILDER
export type FilterFunction = (target: Object) => boolean;
export type FilterFunctionListByGroup = Array<FilterFunction[]>;
export type FilterTuple = [FilterName, FilterFunction];
export type FilterFunctionListMappedToFilterGroup = Map<FilterFunction[], FilterGroup>;
export type FiltersFunctionsData = {
	filterFunctionListByGroup: FilterFunctionListByGroup, 
	filterFunctionListMappedToFilterGroup: FilterFunctionListMappedToFilterGroup,
	filterGroupList: FilterGroup[],
}

//FILTER STATUS / STATISTIC
export type FilteredBoxStatus = {|
	+pass: boolean,
	+filterGroupRejected?: FilterGroup
|};

export type BoxesIdMappedByFilteredStatus = Map<string | boolean, number[]>;
export type BoxesIdMatchingFilter= {[FilterName] : BoxId[]};
export type FilterStatisticDetailed = { type: 'absolute' | 'relative', idList: BoxId[]};
export type FilterStatisticSimplified = { type: 'absolute' | 'relative', number: number};
export type FiltersStatisticsDetailed = { FilterName: FilterStatisticDetailed};
export type FiltersStatisticsSimplified = { FilterName: FilterStatisticSimplified};

//STORAGE IDB CONFIG
export type IndexConfig = ?{multiEntry?: boolean, unique?: boolean};
export type FieldsToIndex = { [string]: IndexConfig };
export type FieldsToIndexByUniverse = { [string]: FieldsToIndex };


//BOX
export type BoxId = number;
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
	rating: number,
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