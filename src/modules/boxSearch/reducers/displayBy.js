// @flow
import type { Action, State } from 'modules/actions/types';

export
type DisplayByState = 'list' | 'card';

function displayReducer(state: DisplayByState = 'list', action: Action): DisplayByState{
	switch (action.type){
		case "BOX_LIST_SEARCH/SET_DISPLAY_BY":
			return action.displayBy;
		default:
			return state;
	}
}

export default displayReducer;

export 
const selectors = {
	getDisplay: (state: State) => (state.boxSearch.displayBy)
}