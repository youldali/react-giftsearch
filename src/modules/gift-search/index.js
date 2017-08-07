import { combineReducers } from 'redux';
import order, { selectors as orderSelectors } from './reducers/order';
import filter, { selectors as filterSelectors } from './reducers/filter';
import universe, { selectors as universeSelectors } from './reducers/universe';
import giftList, { selectors as giftListSelectors } from './reducers/gift-list';
import page, { selectors as pageSelectors } from './reducers/page';
import display, { selectors as displaySelectors } from './reducers/display';

export default
combineReducers({
	order,
	filter,
	universe,
	giftList,
	page,
	display
});

export
const selectors = Object.assign({}, orderSelectors, filterSelectors, universeSelectors, giftListSelectors, pageSelectors, displaySelectors);

