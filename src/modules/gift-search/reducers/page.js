// @flow
import type { Action } from 'modules/actions/types';

type PageState = number;

function pageReducer(state: PageState = 1, action: Action): PageState{
	switch (action.type){
		case "GIFT_LIST_SEARCH/SET_PAGE":
			return action.page;
		default:
			return state;
	}
}

export default pageReducer;

export 
const selectors = {
	getPage: (state: Object) => (state.giftSearch.page)
}