// @flow

type SorterFunction = (objectA: Object, objectB: Object) => number;

export 
const sorterBuilder = (sortData: string): SorterFunction => {
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

export default 
(target: Array<Object>, sortData: string): Array<Object> => {
	const sortedCollection = [...target].sort(sorterBuilder(sortData));
	return sortedCollection;
};