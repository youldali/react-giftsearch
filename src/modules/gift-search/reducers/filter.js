// @flow
import type { Action, Filters, FilterValue } from 'modules/actions/types';
import { deletePropertiesImmutable, hasOne } from 'helpers/object/utils';

type FilterState = {
	+[string]: FilterValue
};



function filterReducer (state: FilterState = {}, action: Action): FilterState {
	switch (action.type){
		case "GIFT_LIST_SEARCH/SET_FILTERS":
			return {...state, ...action.filters};

		case "GIFT_LIST_SEARCH/RESET_FILTERS":
			return hasOne(action.filtersToReset)(state) ? deletePropertiesImmutable(action.filtersToReset)(state) : state;

		case "GIFT_LIST_SEARCH/RESET_ALL_FILTERS":
			return Object.keys(state).length === 0 ? state : {};

		default:
			return state;		
	}
}

export default filterReducer;

//selectors
const getAllFilters = (state: Object): Filters => (state.giftSearch.filter);
const getFilter = (state: Object, filterName: string): FilterValue  => (state.giftSearch.filter[filterName]);
const areFiltersActive = (state: Object, filterNames: Array<string> ): boolean => {
	for (const filterName of filterNames){
    if(getFilter(state, filterName) === undefined)
      return false;
  }
  return true;
};

export 
const selectors = {
	getFilter,
	getAllFilters,
	areFiltersActive
};
