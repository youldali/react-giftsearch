 // @flow
import type { Action } from '../actions/';

type OrderState = string;

function orderReducer (state: OrderState = '', action: Action): OrderState {
	switch (action.type){
		case "SET_ORDER":
			return action.order;
		default:
			return state;
	}
}

export default orderReducer;
