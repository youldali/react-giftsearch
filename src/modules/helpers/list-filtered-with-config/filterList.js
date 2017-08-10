//@flow

import "babel-polyfill";

type FilterValue = number | string | boolean;
type Filters = { +[string]: FilterValue};
type Criteria = {|field: string, operator: string|};
type Criterias = $ReadOnlyArray<Criteria>;
type CriteriasCollection = {+[string]: {criterias: Criterias}};
type FilterFunction = (target: Object) => boolean;

/**
 * Build a sub Query for a specific criterias list
 */
export 
const buildFilterSubQuery = (threshold: FilterValue, criterias: Criterias, objectName: string): string => {
	let filterToEval = '';
	for (const {field, operator} of criterias) {
		const thresholdFormatted = typeof threshold === 'string' ? `"${threshold}"` : threshold;
		filterToEval += `&& ${objectName}['${field}'] ${operator} ${thresholdFormatted} `;
	}

	return filterToEval;
};


/**
 * Build a query based on the state filters
 */
export 
const buildFilterQuery = (filters: Filters, criteriasCollection: CriteriasCollection, objectName: string): string => {
	let filterToEval = 'true ';

	for (const [filterName, threshold] of Object.entries(filters)) {
	    if(!criteriasCollection.hasOwnProperty(filterName) || (typeof threshold !== 'number' && typeof threshold !== 'string' && typeof threshold !== 'boolean'))
	    	continue;

	    filterToEval += buildFilterSubQuery(threshold, criteriasCollection[filterName].criterias, objectName);
	}

	return filterToEval;
};


/**
 * Returns a filter function
 */
export
const filterObjectAgainstCriterias = (filters: Filters, criteriasCollection: CriteriasCollection): FilterFunction => {
	return (target: Object): boolean => {
		const filterToEval = buildFilterQuery(filters, criteriasCollection, 'target');
		return eval(filterToEval);
	}
};


/**
 * filters an array of object and returns a new array
 */
export default
(target: Array<Object>, filters: Filters, criteriasCollection: CriteriasCollection): Array<Object> => {
	return target.filter(filterObjectAgainstCriterias(filters, criteriasCollection));
};
