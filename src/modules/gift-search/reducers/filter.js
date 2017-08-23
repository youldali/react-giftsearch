// @flow
import type { Action, Filters, FilterValue } from 'modules/actions/types';
import { deletePropertiesImmutable } from 'helpers/object/index';

type FilterState = {
	+[string]: FilterValue
};


function filterReducer (state: FilterState = {}, action: Action): FilterState {
	switch (action.type){
		case "GIFT_LIST_SEARCH/SET_FILTERS":
			return {...state, ...action.filters};

		case "GIFT_LIST_SEARCH/RESET_FILTERS":
			const currentFilters = Object.keys(state);
			let hasFilterToReset = false;
			for (const filterToReset of action.filtersToReset) {
				if(currentFilters.indexOf(filterToReset) > -1){
					hasFilterToReset = true;
					break;
				}
			}

			if(hasFilterToReset)
				return deletePropertiesImmutable(state, action.filtersToReset);
			else
				return state;

		case "GIFT_LIST_SEARCH/RESET_ALL_FILTERS":
			if(Object.keys(state).length === 0)
				return state;
			else
				return {};

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
