// @flow
import {SET_FILTER, RESET_FILTER} from '../actions/';

type actionType = {
	type: string,
	field: string,
	filter: ?string
};

type stateType = {
	[string]: string
};

function filterReducer (state: stateType = {}, action: actionType): stateType {
	switch (action.type){
		case SET_FILTER:
			return {...state, [action.field]: action.filter};
		case RESET_FILTER:
			return {...state, [action.field]: ''};
		default:
			return state;		
	}
}

export default filterReducer;