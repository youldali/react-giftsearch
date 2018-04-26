//@flow

import { combineReducers } from 'redux';
import orderBy, { selectors as orderBySelectors } from './reducers/orderBy';
import filtersApplied, { selectors as filtersAppliedSelectors } from './reducers/filtersApplied';
import boxList, { selectors as boxListSelectors } from './reducers/boxList';
import page, { selectors as pageSelectors } from './reducers/page';
import displayBy, { selectors as displayBySelectors } from './reducers/displayBy';

export default
combineReducers({
	boxList,
	filtersApplied,
	orderBy,
	page,
	displayBy
});

export { orderBySelectors, filtersAppliedSelectors, boxListSelectors, pageSelectors, displayBySelectors };

