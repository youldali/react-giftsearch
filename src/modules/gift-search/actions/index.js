 // @flow
 
export const SET_FILTER = 'SET_FILTER';
export const RESET_FILTER = 'RESET_FILTER';

export const SET_ORDER = 'SET_FILTER';

export function setFilter(field: string, filter: string){
	return{
		type: SET_FILTER,
		field,
		filter
	}
};

export function resetFilter(field: string){
	return{
		type: RESET_FILTER,
		field
	}
};

export function setOrder(order: string){
	return{
		type: SET_ORDER,
		order
	}
};