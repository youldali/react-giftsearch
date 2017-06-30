import { combineReducers } from 'redux';
import order from './reducers/order';
import filter from './reducers/filter';
import universe from './reducers/universe';
import * as actions from './actions/';


export const giftSearchReducer = combineReducers({
	order,
	filter,
	universe
});

export { actions };
