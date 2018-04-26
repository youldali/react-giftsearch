 // @flow
import type { Action } from 'modules/actions/types';

type OrderState = string | Array<number>;

const initialState = '';
function orderReducer (state: OrderState = initialState, action: Action): OrderState {
	switch (action.type){
		case "BOX_LIST_SEARCH/SET_ORDER":
			return action.order;

		default:
			return state;
	}
}

export default orderReducer;

export 
const selectors = {
	getOrderBy: (state: Object) => (state.boxSearch.orderBy)
};
