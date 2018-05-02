// @flow
import type { Action, State } from 'modules/actions/types';

export
type PageState = number;

const initialState = 1;

function pageReducer(state: PageState = initialState, action: Action): PageState{
	switch (action.type){
		case "BOX_LIST_SEARCH/SET_PAGE":
			return action.page;
		case "BOX_LIST_SEARCH/INCREMENT_PAGE":
			return ++state;
		case "BOX_LIST_SEARCH/SET_APPLIED_FILTERS":
		case "BOX_LIST_SEARCH/RESET_APPLIED_FILTERS":
		case "BOX_LIST_SEARCH/RESET_ALL_APPLIED_FILTERS":
		case "BOX_LIST_SEARCH/SET_BOX_LIST":
		case "BOX_LIST_SEARCH/SET_DISPLAY_BY":
		case "BOX_LIST_SEARCH/SET_ORDER_BY":
			return initialState;
		default:
			return state;
	}
}

export default pageReducer;

export 
const selectors = {
	getPage: (state: State) => (state.boxSearch.page)
}