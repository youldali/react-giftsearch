import { combineReducers } from 'redux';
import order from './reducers/list-order.js';
import filter from './reducers/list-filter.js';

const giftSearchReducer = combineReducers({
	order,
	filter
});

export default giftSearchReducer;