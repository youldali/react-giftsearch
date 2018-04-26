// @flow
import type { Action } from 'modules/actions/types';
import type { Filters, FilterValue, FilterName, FilterOperand, FiltersSelectedState } from '../types';
import { hasOne } from 'helpers/object/utils';
import { omit, curry } from 'ramda';

type FilterState = {
	+[string]: FilterValue
};

function filterReducer (state: FilterState = {}, action: Action): FilterState {
	switch (action.type){
		case "BOX_LIST_SEARCH/SET_FILTERS":
			return {...state, ...action.filters};

		case "BOX_LIST_SEARCH/RESET_FILTERS":
			return hasOne(action.filtersToReset)(state) ? omit(action.filtersToReset, state) : state;

		case "BOX_LIST_SEARCH/RESET_ALL_FILTERS":
			return Object.keys(state).length === 0 ? state : {};

		default:
			return state;		
	}
}

export default filterReducer;

//selectors

const _getIsFilterApplied = (filtersSelectedState: FiltersSelectedState, filterName: FilterName) => 
    filtersSelectedState[filterName] === undefined ? false : true;
export const getIsFilterSelected = curry(_getIsFilterApplied);


const getAllAppliedFilters = (state: Object): Filters => (state.boxSearch.filtersSelected);
const getFilterValue = (state: Object, filterName: string): FilterValue  => (state.boxSearch.filter[filterName]);
const areFiltersApplied = (state: Object, filterNames: Array<string> ): boolean => {
	for (const filterName of filterNames){
    if(getFilterValue(state, filterName) === undefined)
      return false;
  }
  return true;
};

export 
const selectors = {
	getFilterValue,
	getAllAppliedFilters,
	areFiltersApplied
};
