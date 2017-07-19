//@flow

import type { Filters } from 'modules/actions/types';
import { filterConfig } from 'config';

export const 
buildFilterSubQuery = (targetObject: Object, threshold: number, criterias: Array<Object>, objectName: string): string => {
	let filterToEval = '';
	for (const {field, operator} of criterias) {
		
		if(!targetObject.hasOwnProperty(field))
			continue;

		filterToEval += ` AND ${objectName}['${field}'] ${operator} ${threshold} `;
	}

	return filterToEval;
};

export 
const buildFilterQuery = (targetObject: Object, filters: Filters, objectName: string): string => {
	let filterToEval = 'true';

	for (const [filterName, threshold] of Object.entries(filters)) {
	    if(!filterConfig.hasOwnProperty(filterName))
	    	continue;

	    filterToEval += buildFilterSubQuery(targetObject, threshold, filterConfig[filterName], objectName);
	}

	return filterToEval;
};

export
const filterObjectAgainstCriterias = (filters: Filters): boolean => {
	return (objectToFilter: Object) => {
		let filterToEval = buildFilterQuery(objectToFilter, criterias, threshold, 'objectToFilter');
		return eval(filterToEval);
	}
};