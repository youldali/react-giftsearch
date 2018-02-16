import "babel-polyfill";
import operators from './operators';
import { map, mapObjIndexed, compose } from 'ramda';

type FilterName = string;
type FilterGroup = string;
type FilterValue = number | string | boolean;
type Filters = { +[string]: FilterValue};
type Criteria = {|field: string, operator: string, value?: FilterValue|};
type Criterias = $ReadOnlyArray<Criteria>;
type CriteriasCollection = {+[string]: {criterias: Criterias, +filterGroup?: string}};

type FilterFunction = (target: Object) => boolean;
type FilterCollection = Map<?string, Array<FilterFunction>>;
type FilterObject = {value: FilterValue, criterias: Criterias};

type FilterTuple = [FilterName, FilterFunction];
type GroupTuple = [FilterGroup, FilterFunction];

/**
 ** filters an object for a group filter with || operator
 */
export
const filterObjectWithFilterGroup = (filterGroupCollection: Array<Function>, target: Object): boolean => {
	return (function evaluateNextFilterFunction(iterator: Iterator<FilterFunction>): boolean{
		//condition to get out of recursive call
		const currentIteratorState = iterator.next();
			if(currentIteratorState.done)
				return false;

		//eval the current criteria and ask for eval of the next one
		const filterFunction = currentIteratorState.value;
		return filterFunction(target) || evaluateNextFilterFunction(iterator);
	})(filterGroupCollection[Symbol.iterator]());
};


/**
 ** filters an object for a group filter with && operator
 */
export
const filterObjectWithIndependentFilters = (filterGroupCollection: Array<Function>, target: Object): boolean => {
	return (function evaluateNextFunction(iterator: Iterator<FilterFunction>): boolean{
		//condition to get out of recursive call
		const currentIteratorState = iterator.next();
			if(currentIteratorState.done)
				return true;

		//eval the current criteria and ask for eval of the next one
		const filterFunction = currentIteratorState.value;
		return filterFunction(target) && evaluateNextFunction(iterator);
	})(filterGroupCollection[Symbol.iterator]());
};

/**
 * Returns a filter function
 */
export
const filterObjectWithFilterCollection = (filterCollection: FilterCollection): FilterFunction => {
	return (target: Object): boolean => {

		const filterCollectionIterator = filterCollection.entries();
		return (function evaluateNextFilterGroupCollection(iterator: Iterator<[?string, Array<FilterFunction>]>): boolean{
			//condition to get out of recursive call
			const currentIteratorState = iterator.next();
			if(currentIteratorState.done)
				return true;

			//eval the current criteria and ask for eval of the next one
			const [filterGroupName, filterGroupCollection] = currentIteratorState.value;
			if(filterGroupName === undefined)
				return filterObjectWithIndependentFilters(filterGroupCollection, target) && evaluateNextFilterGroupCollection(iterator);
			else
				return filterObjectWithFilterGroup(filterGroupCollection, target) && evaluateNextFilterGroupCollection(iterator);
			
		})(filterCollectionIterator);

	}
};


/**
 * filters an array of object and returns a new array
 */
export default
(target: Array<Object>, filters: Filters, criteriasCollection: CriteriasCollection): Array<Object> => {
	const filterCollection = getFiltersFunctionsCollection(filters, criteriasCollection);
	return target.filter(filterObjectWithFilterCollection(filterCollection));
};