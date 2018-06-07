// @flow
import type { Action, State } from 'modules/actions/types';
import { LOCATION_CHANGE } from 'react-router-redux';

export
type RouterState = {
	universe: string
};

const initialState = {
	universe: 'mock-1000'
};

function routerReducer(state: RouterState = initialState, action: Action): RouterState{
	switch (action.type){
		case LOCATION_CHANGE:
			const universe = 'sejour';
			return {universe};
		default:
			return state;
	}
}

export default routerReducer;

export 
const selectors = {
	getUniverse: (state: State) => (state.boxSearch.router.universe)
}