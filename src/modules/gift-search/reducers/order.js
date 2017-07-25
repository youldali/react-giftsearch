 // @flow
import type { Action } from 'modules/actions/types';

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

export 
const selectors = {
	getOrder: (state: Object) => (state.giftSearch.order)
};
