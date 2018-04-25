//@flow

import { combineReducers } from 'redux';
import orderBy, { selectors as orderBySelectors } from './reducers/orderBy';
import selectedFilters, { selectors as selectedFiltersSelectors } from './reducers/selectedFilters';
import boxList, { selectors as boxListSelectors } from './reducers/boxList';
import page, { selectors as pageSelectors } from './reducers/page';
import displayBy, { selectors as displayBySelectors } from './reducers/displayBy';

export default
combineReducers({
	boxList,
	selectedFilters,
	orderBy,
	page,
	displayBy
});

export { orderBySelectors, selectedFiltersSelectors, boxListSelectors, pageSelectors, displayBySelectors };

