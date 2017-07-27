// @flow
import type { Action } from 'modules/actions/types';

type FilterState = {
	+[string]: string
};

function filterReducer (state: FilterState = {}, action: Action): FilterState {
	switch (action.type){
		case "SET_FILTER":
			return {...state, ...action.filters};
		case "RESET_FILTER":
			let resetedFilters = {...state};
			for (let field of (action.filters)) {
				delete resetedFilters[field];
			}
			return resetedFilters;
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
