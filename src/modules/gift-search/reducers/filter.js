// @flow
import type { Action, Filters, FilterValue } from 'modules/actions/types';
import { deletePropertiesImmutable } from 'helpers/object/index';

type FilterState = {
	+[string]: FilterValue
};


function filterReducer (state: FilterState = {}, action: Action): FilterState {
	switch (action.type){
		case "GIFT_LIST_SEARCH/SET_FILTERS":
			let newState = deletePropertiesImmutable(state, action.filtersToReset);
			return {...newState, ...action.filters};
		case "GIFT_LIST_SEARCH/RESET_FILTERS":
			return deletePropertiesImmutable(state, action.filtersToReset);
		default:
			return state;		
	}
}

export default filterReducer;

//selectors
const getFilters = (state: Object): Filters => (state.giftSearch.filter);
const getFilter = (state: Object, filterName: string): FilterValue  => (state.giftSearch.filter[filterName]);
const areFiltersActive = (state: Object, filtersToCompare: Filters ): boolean => {
	for (const filterName of Object.keys(filtersToCompare)){
    if(getFilter(state, filterName) !== filtersToCompare[filterName])
      return false;
  }
  return true;
};

export 
const selectors = {
	getFilter,
	getFilters,
	areFiltersActive
};
