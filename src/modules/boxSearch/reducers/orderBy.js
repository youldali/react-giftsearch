 // @flow
import type { Action, State } from 'modules/actions/types';

export
type OrderByState = string;

const initialState = 'id';
function orderReducer (state: OrderByState = initialState, action: Action): OrderByState {
	switch (action.type){
		case "BOX_LIST_SEARCH/SET_ORDER_BY":
			return action.orderBy;

		default:
			return state;
	}
}

export default orderReducer;

export 
const selectors = {
	getOrderBy: (state: State) => (state.boxSearch.orderBy)
};
