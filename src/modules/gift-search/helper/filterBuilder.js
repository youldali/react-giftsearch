//@flow

import type { Filters } from 'modules/actions/types';
import { filterConfig } from 'config';


type FilterFunction = (target: Object) => boolean;

/*
 * Build a sub Query for a specific criterias list
 */
export const 
buildFilterSubQuery = (threshold: number, criterias: Array<Object>, objectName: string): string => {
	let filterToEval = '';
	for (const {field, operator} of criterias) {
		filterToEval += `&& ${objectName}['${field}'] ${operator} ${threshold} `;
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
	    if(!filterConfig.hasOwnProperty(filterName))
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
	return (target: Object): Boolean => {
		const filterToEval = buildFilterQuery(filters, 'target');
		return eval(filterToEval);
	}
};