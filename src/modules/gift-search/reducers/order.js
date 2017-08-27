 // @flow
import type { Action } from 'modules/actions/types';

type OrderState = string | Array<string | number>;

const initialState = '';
function orderReducer (state: OrderState = initialState, action: Action): OrderState {
	switch (action.type){
		case "GIFT_LIST_SEARCH/SET_ORDER":
			return action.order;

		/**
		 * in case of elastic search filter, we sort the list by predefined ID (array) (relevance to the search)
		 */
		case "GIFT_LIST_SEARCH/SET_FILTERS":
			const elasticSearchFilter = action.filters.elasticSearch;
			if(elasticSearchFilter === undefined)
				return state;
			else
				return elasticSearchFilter;

		case "GIFT_LIST_SEARCH/RESET_FILTERS":
			if(action.filtersToReset.indexOf('elasticSearch') >= 0 && Array.isArray(state))
				return initialState;
			else
				return state;

		default:
			return state;
	}
}

export default orderReducer;

export 
const selectors = {
	getOrder: (state: Object) => (state.giftSearch.order)
};
