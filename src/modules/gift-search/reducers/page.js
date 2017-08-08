// @flow
import type { Action } from 'modules/actions/types';

type PageState = number;

function pageReducer(state: PageState = 1, action: Action): PageState{
	switch (action.type){
		case "GIFT_LIST_SEARCH/SET_PAGE":
			return action.page;
		case "GIFT_LIST_SEARCH/INCREMENT_PAGE":
			return ++state;
		case "GIFT_LIST_SEARCH/DECREMENT_PAGE":
			return (state > 0 ? --state : state);
		case "GIFT_LIST_SEARCH/SET_FILTERS":
			return 1;
		default:
			return state;
	}
}

export default pageReducer;

export 
const selectors = {
	getPage: (state: Object) => (state.giftSearch.page)
}