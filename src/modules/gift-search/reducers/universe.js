// @flow
import { SET_UNIVERSE } from '../actions/';

type actionType = {
	type: string,
	universe: string
};

function universeReducer(state: string = '', action: actionType): string{
	switch (action.type){
		case SET_UNIVERSE:
			return action.universe
		default:
			return state;
	}
}

export default universeReducer;