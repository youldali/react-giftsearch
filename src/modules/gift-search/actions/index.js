 // @flow
 
export const SET_FILTER = 'SET_FILTER';
export const RESET_FILTER = 'RESET_FILTER';
export const SET_ORDER = 'SET_ORDER';
export const SET_UNIVERSE = 'SET_UNIVERSE';

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

export function setUniverse(universe: string){
	return{
		type: SET_UNIVERSE,
		universe
	}
}

/*
function isFetchingGiftList(isFetching: boolean){
	return{
		type: IS_FETCHING_GIFT_LIST,
		isFetching
	}	
}

export function fetchGiftList(universe){
	const fetchConfig = {
		method: 'POST'
	};
	const url = '//www.smartbox.com/fr/cloudsearch/search/thematic/?sortby=position&price[from]=0&price[to]=50';
	return (dispatch) => {
		fetch(url, fetchConfig).then(response => dispatch())
	}
}
*/