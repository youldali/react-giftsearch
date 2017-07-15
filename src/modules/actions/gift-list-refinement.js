 // @flow
import type { Action, Filters, Dispatch } from './types';

export 
function setFilter(filters: Filters): Action {
	return{
		type: "SET_FILTER",
		filters
	}
};

export 
function resetFilter(filters: Array<string>): Action{
	return{
		type: "RESET_FILTER",
		filters
	}
};

export 
function setOrder(order: string): Action{
	return{
		type: "SET_ORDER",
		order
	}
};

export 
function setUniverse(universe: string): Action{
	return{
		type: "SET_UNIVERSE",
		universe
	}
}



