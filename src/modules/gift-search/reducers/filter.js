// @flow
import type { Action } from 'modules/actions/types';
import { deletePropertiesImmutable } from 'helpers/object/index';

type FilterState = {
	+[string]: string
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

export 
const selectors = {
	getFilters: (state: Object) => (state.giftSearch.filter),
	getFilter: (state: Object, filterName: string) => (state.giftSearch.filter[filterName])
};
