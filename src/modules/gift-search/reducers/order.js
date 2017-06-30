 // @flow
import {SET_ORDER} from '../actions/';

type actionType = {
	type: string,
	order:string
};

function orderReducer (state: string = '', action: actionType): string {
	switch (action.type){
		case SET_ORDER:
			return action.order;
		default:
			return state;
	}
}

export default orderReducer;
