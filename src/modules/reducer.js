import { combineReducers } from 'redux';
import { giftSearchReducer as giftSearch } from './gift-search/';

const rootReducer = combineReducers({
	giftSearch
});

export default rootReducer;