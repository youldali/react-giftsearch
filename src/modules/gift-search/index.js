import { combineReducers } from 'redux';
import order from './reducers/order';
import filter from './reducers/filter';
import universe from './reducers/universe';
import giftList from './reducers/gift-list';


export default
combineReducers({
	order,
	filter,
	universe,
	giftList
});

