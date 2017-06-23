import { combineReducers } from 'redux';
import order from './reducers/list-order.js';
import filter from './reducers/list-filter.js';
import * as actions from './actions/';


export const giftSearchReducer = combineReducers({
	order,
	filter
});

export { actions };
