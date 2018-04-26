 // @flow
import type { Action, DisplayType, FiltersAppliedState } from './types';

export 
const setAppliedFilters = (filtersApplied: FiltersAppliedState): Action => (
	{
		type: "BOX_LIST_SEARCH/SET_APPLIED_FILTERS",
		filtersApplied
	}
);

export 
const resetAppliedFilters = (filtersAppliedToReset: Array<string>): Action => (
	{
		type: "BOX_LIST_SEARCH/RESET_APPLIED_FILTERS",
		filtersAppliedToReset
	}
);

export 
const resetAllAppliedFilters = (): Action => (
	{
		type: "BOX_LIST_SEARCH/RESET_ALL_APPLIED_FILTERS",
	}
);

export 
const setOrder = (orderBy: string): Action => (
	{
		type: "BOX_LIST_SEARCH/SET_ORDER_BY",
		orderBy
	}
);

export 
const setPage = (page: number): Action => (
	{
		type: "BOX_LIST_SEARCH/SET_PAGE",
		page
	}
);

export 
const incrementPage = (): Action => (
	{
		type: "BOX_LIST_SEARCH/INCREMENT_PAGE",
	}
);

export 
const decrementPage = (): Action => (
	{
		type: "BOX_LIST_SEARCH/DECREMENT_PAGE",
	}
);

export 
const setDisplayBy = (displayBy: DisplayType): Action => (
	{
		type: "BOX_LIST_SEARCH/SET_DISPLAY_BY",
		displayBy
	}
);

