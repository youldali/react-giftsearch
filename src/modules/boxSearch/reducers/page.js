// @flow
import type { Action } from 'modules/actions/types';

type PageState = number;
const initialState = 1;

function pageReducer(state: PageState = initialState, action: Action): PageState{
	switch (action.type){
		case "BOX_LIST_SEARCH/SET_PAGE":
			return action.page;
		case "BOX_LIST_SEARCH/INCREMENT_PAGE":
			return ++state;
		case "BOX_LIST_SEARCH/DECREMENT_PAGE":
			return (state > 0 ? --state : state);
		case "BOX_LIST_SEARCH/SET_FILTERS":
		case "BOX_LIST_SEARCH/RESET_FILTERS":
		case "BOX_LIST_SEARCH/RESET_ALL_FILTERS":
		case "BOX_LIST_SEARCH/SET_BOX_LIST":
		case "BOX_LIST_SEARCH/SET_DISPLAY":
		case "BOX_LIST_SEARCH/SET_ORDER":
			return initialState;
		default:
			return state;
	}
}

export default pageReducer;

export 
const selectors = {
	getPage: (state: Object) => (state.boxSearch.page)
}