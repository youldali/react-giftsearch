 // @flow
import type { Action } from 'modules/actions/types';

type OrderState = string | Array<number>;

const initialState = '';
function orderReducer (state: OrderState = initialState, action: Action): OrderState {
	switch (action.type){
		case "GIFT_LIST_SEARCH/SET_ORDER":
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
