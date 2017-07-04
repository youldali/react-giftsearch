// @flow
import type { Action } from '../actions/';

type UniverseState = string;

function universeReducer(state: UniverseState = '', action: Action): UniverseState{
	switch (action.type){
		case "SET_UNIVERSE":
			return action.universe
		default:
			return state;
	}
}

export default universeReducer;