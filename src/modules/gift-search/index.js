import { combineReducers } from 'redux';
import order, { selectors as orderSelectors } from './reducers/order';
import filter, { selectors as filterSelectors } from './reducers/filter';
import universe, { selectors as universeSelectors } from './reducers/universe';
import giftList, { selectors as giftListSelectors } from './reducers/gift-list';


export default
combineReducers({
	order,
	filter,
	universe,
	giftList
});

export
const selectors = Object.assign({}, orderSelectors, filterSelectors, universeSelectors, giftListSelectors);

