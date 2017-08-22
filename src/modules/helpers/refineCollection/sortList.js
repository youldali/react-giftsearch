// @flow

type SorterFunction = (objectA: Object, objectB: Object) => number;
type SortData = string | Array<number | string>;

export 
const sorterByField = (sortData: string): SorterFunction => {
	const reverse = sortData.charAt(0) === '-' ? -1 : 1;
	const sortField = sortData.charAt(0) === '-' ? sortData.substr(1) : sortData;

	return (targetA: Object, targetB: Object): number => {

		switch(typeof targetA[sortField]){
			case 'string':
				return (targetA[sortField].localeCompare(targetB[sortField])) * reverse;
			case 'number':
				const result = (targetA[sortField] - targetB[sortField]) * reverse;
				return isNaN(result) ? 0 : result;
			default:
				return 0;
		}
	};
};

export 
const sortByPredefinedIdList = (idList: Array<mixed>): SorterFunction => {
	return (targetA: Object, targetB: Object): number => {
		return (idList.indexOf(targetA.id) - idList.indexOf(targetB.id)) * -1
	};
};

export
const sorterBuilder = (sortData: SortData): Function => {
	if(Array.isArray(sortData))
		return sortByPredefinedIdList(sortData.reverse());
	else
		return sorterByField(sortData);
};

export default 
(target: Array<Object>, sortData: SortData): Array<Object> => {
	const sortFunction = sorterBuilder(sortData);
	const sortedCollection = [...target].sort(sortFunction);
	return sortedCollection;
};

