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
			let resetedFilters = {};
			for (let field of (action.filters)) {
				resetedFilters[field] = '';
			}
			return {...state, ...resetedFilters};
		default:
			return state;		
	}
}

export default filterReducer;

export 
const selectors = {
	getFilters: (state: Object) => (state.giftSearch.filter),
	getFilter: (state: Object, filter: string) => (state.giftSearch.filter[filter])
};
