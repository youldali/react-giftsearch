//@flow

import type { Filters, FilterValue } from 'modules/actions/types';
import type { Criterias } from 'config';
import { filterConfig } from 'config';


type FilterFunction = (target: Object) => boolean;

/*
 * Build a sub Query for a specific criterias list
 */
export const 
buildFilterSubQuery = (threshold: FilterValue, criterias: Criterias, objectName: string): string => {
	let filterToEval = '';
	for (const {field, operator} of criterias) {
		const thresholdFormatted = typeof threshold === 'string' ? `"${threshold}"` : threshold;
		filterToEval += `&& ${objectName}['${field}'] ${operator} ${thresholdFormatted} `;
	}

	return filterToEval;
};


/*
 * Build a query based on the state filters
 */
export 
const buildFilterQuery = (filters: Filters, objectName: string): string => {
	let filterToEval = 'true ';

	for (const [filterName, threshold] of Object.entries(filters)) {
	    if(!filterConfig.hasOwnProperty(filterName) || (typeof threshold !== 'number' && typeof threshold !== 'string'))
	    	continue;

	    filterToEval += buildFilterSubQuery(threshold, filterConfig[filterName], objectName);
	}

	return filterToEval;
};


/*
 * Returns a filter function
 */
export
const filterObjectAgainstCriterias = (filters: Filters): FilterFunction => {
	return (target: Object): boolean => {
		const filterToEval = buildFilterQuery(filters, 'target');
		return eval(filterToEval);
	}
};