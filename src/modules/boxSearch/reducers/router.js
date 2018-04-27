// @flow
import type { Action } from 'modules/actions/types';
import { LOCATION_CHANGE } from 'react-router-redux';

type RouterState = {
	universe: string
};

const initialState = {
	universe: ''
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
	getUniverse: (state: Object) => (state.boxSearch.router.universe)
}