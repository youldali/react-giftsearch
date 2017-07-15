import { combineReducers } from 'redux';
import order from './reducers/order';
import filter from './reducers/filter';
import universe from './reducers/universe';


export default
combineReducers({
	order,
	filter,
	universe
});

