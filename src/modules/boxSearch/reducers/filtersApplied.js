// @flow
import type { Action, State } from 'modules/actions/types';
import type { FiltersApplied, FilterName, FilterOperand } from '../types';
import { hasOne } from 'helpers/object/utils';
import { omit, curry } from 'ramda';

export 
type FilterAppliedState = {
	+[string]: FilterOperand
};

function filterReducer (state: FilterAppliedState = {}, action: Action): FilterAppliedState {
	switch (action.type){
		case "BOX_LIST_SEARCH/SET_APPLIED_FILTERS":
			return {...state, ...action.filtersToApply};

		case "BOX_LIST_SEARCH/RESET_APPLIED_FILTERS":
			return hasOne(action.filtersToReset)(state) ? omit(action.filtersToReset, state) : state;

		case "BOX_LIST_SEARCH/RESET_ALL_APPLIED_FILTERS":
			return Object.keys(state).length === 0 ? state : {};

		default:
			return state;		
	}
}

export default filterReducer;

//selectors
const _getIsFilterApplied = (filtersAppliedState: FilterAppliedState, filterName: FilterName) => 
	filtersAppliedState[filterName] === undefined ? false : true;
export const getIsFilterApplied = curry(_getIsFilterApplied);


const getAllAppliedFilters = (state: State): FiltersApplied => (state.boxSearch.filtersApplied);

const getFilterValue = (state: State, filterName: string): FilterOperand  => (state.boxSearch.filtersApplied[filterName]);

const areFiltersApplied = (state: State, filterNames: Array<string> ): boolean => {
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
	areFiltersApplied,
	getIsFilterApplied
};
