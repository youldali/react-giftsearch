 // @flow
import type { Action, Filters, Dispatch } from './types';
import { filterConfig } from 'modules/gift-search/config';
import { findMultipleRelatedFilters } from '../helpers/list-filtered-with-config/relatedFilters';

export 
function setFilters(filters: Filters): Action {
	const filtersToReset = findMultipleRelatedFilters(filterConfig, Object.keys(filters));
	return{
		type: "GIFT_LIST_SEARCH/SET_FILTERS",
		filters,
		filtersToReset
	}
};

export 
function resetFilters(filtersToReset: Array<string>): Action{
	return{
		type: "GIFT_LIST_SEARCH/RESET_FILTERS",
		filtersToReset
	}
};

export 
function setOrder(order: string): Action{
	return{
		type: "GIFT_LIST_SEARCH/SET_ORDER",
		order
	}
};

export 
function setUniverse(universe: string): Action{
	return{
		type: "GIFT_LIST_SEARCH/SET_UNIVERSE",
		universe
	}
}

