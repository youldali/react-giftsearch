// @flow
import type { Action } from '../actions/';

type FilterState = {
	+[string]: string
};

function filterReducer (state: FilterState = {}, action: Action): FilterState {
	switch (action.type){
		case "SET_FILTER":
			return {...state, ...action.filters};
		case "RESET_FILTER":
			let filters = action.filters;
			for (let filter in filters) {
				filters[filter] = '';
			}
			return {...state, ...filters};
		default:
			return state;		
	}
}

export default filterReducer;