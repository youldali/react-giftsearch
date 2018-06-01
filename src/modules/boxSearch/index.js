//@flow

import { combineReducers } from 'redux';
import orderBy, { selectors as orderBySelectors } from './reducers/orderBy';
import filtersApplied, { selectors as filtersAppliedSelectors } from './reducers/filtersApplied';
import filtersStatistics, { selectors as filtersStatisticsSelectors } from './reducers/filtersStatistics';
import boxList, { selectors as boxListSelectors } from './reducers/boxList';
import page, { selectors as pageSelectors } from './reducers/page';
import displayBy, { selectors as displayBySelectors } from './reducers/displayBy';
import router, { selectors as routerSelectors } from './reducers/router';

import filterConfig from './config/filter.config';
import filterBlockConfig from './config/filterBlock.config';
import {getFilterStructureMap, getFilterStructureByFilterGroup} from './configHelpers/filterConfigResolver';

export default
combineReducers({
	boxList,
	displayBy,
	filtersApplied,
	filtersStatistics,
	orderBy,
	page,
	router
});

export 
const selectors = { boxListSelectors, displayBySelectors, filtersAppliedSelectors, filtersStatisticsSelectors, orderBySelectors, pageSelectors, routerSelectors };

export 
const config = {filterConfig, filterBlockConfig};

export 
const helpers = {getFilterStructureMap, getFilterStructureByFilterGroup};

