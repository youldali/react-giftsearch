 // @flow
import type { Action, Filters, DisplayType } from './types';

export 
const setFilters = (filters: Filters): Action => (
	{
		type: "GIFT_LIST_SEARCH/SET_FILTERS",
		filters
	}
);

export 
const resetFilters = (filtersToReset: Array<string>): Action => (
	{
		type: "GIFT_LIST_SEARCH/RESET_FILTERS",
		filtersToReset
	}
);

export 
const resetAllFilters = (): Action => (
	{
		type: "GIFT_LIST_SEARCH/RESET_ALL_FILTERS",
	}
);

export 
const setOrder = (order: string): Action => (
	{
		type: "GIFT_LIST_SEARCH/SET_ORDER",
		order
	}
);

export 
const setUniverse = (universe: string): Action => (
	{
		type: "GIFT_LIST_SEARCH/SET_UNIVERSE",
		universe
	}
);

export 
const setPage = (page: number): Action => (
	{
		type: "GIFT_LIST_SEARCH/SET_PAGE",
		page
	}
);

export 
const incrementPage = (): Action => (
	{
		type: "GIFT_LIST_SEARCH/INCREMENT_PAGE",
	}
);

export 
const decrementPage = (): Action => (
	{
		type: "GIFT_LIST_SEARCH/DECREMENT_PAGE",
	}
);

export 
const setDisplay = (display: DisplayType): Action => (
	{
		type: "GIFT_LIST_SEARCH/SET_DISPLAY",
		display
	}
);

