//@flow

import { combineReducers } from 'redux';
import orderBy, { selectors as orderBySelectors } from './reducers/orderBy';
import filtersApplied, { selectors as filtersAppliedSelectors } from './reducers/filtersApplied';
import boxesStatistics, { selectors as boxesStatisticsSelectors } from './reducers/boxesStatistics';
import boxList, { selectors as boxListSelectors } from './reducers/boxList';
import page, { selectors as pageSelectors } from './reducers/page';
import displayBy, { selectors as displayBySelectors } from './reducers/displayBy';

import filterConfig from './config/filter.config';
import filterBlockConfig from './config/filterBlock.config';
import {getFilterStructureMap, getFilterStructureByFilterGroup} from './configHelpers/filterConfigResolver';

export default
combineReducers({
	boxesStatistics,
	boxList,
	displayBy,
	filtersApplied,
	orderBy,
	page,
});

export 
const selectors = { boxesStatisticsSelectors, boxListSelectors, displayBySelectors, filtersAppliedSelectors, orderBySelectors, pageSelectors };

export 
const config = {filterConfig, filterBlockConfig};

export 
const helpers = {getFilterStructureMap, getFilterStructureByFilterGroup};

