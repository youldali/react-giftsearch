// @flow
import type { Action } from 'modules/actions/types';

type DisplayState = 'list' | 'card';

function displayReducer(state: DisplayState = 'list', action: Action): DisplayState{
	switch (action.type){
		case "GIFT_LIST_SEARCH/SET_DISPLAY":
			return action.display;
		default:
			return state;
	}
}

export default displayReducer;

export 
const selectors = {
	getDisplaySelector: (state: Object) => (state.giftSearch.display)
}