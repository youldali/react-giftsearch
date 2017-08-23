// @flow
import type { Action } from 'modules/actions/types';

type elacticSearchState = {
	searchText: string,
	giftMatchedId: Array<number>
};

function elacticSearchReducer(state: elacticSearchState = '', action: Action): elacticSearchState{
	switch (action.type){
		case "GIFT_LIST_SEARCH/ELASTIC_SEARCH_SET_TEXT":
			return {
				searchText: action.searchText
			};

		case "GIFT_LIST_SEARCH/ELASTIC_SEARCH_GIFT_MATCHED":
			return {...state, {giftMatchedId: action.giftMatchedId} };

		default:
			return state;
	}
}

export default elacticSearchReducer;

export 
const selectors = {
	getElacticSearch: (state: Object) => (state.giftSearch.elacticSearch)
}