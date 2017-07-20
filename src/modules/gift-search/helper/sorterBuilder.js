// @flow

import type { Gift } from 'modules/actions/types';
type SorterFunction = (giftA: Gift, giftB: Gift) => number;

export default
(sortState: string): SorterFunction => {
	const reverse = sortState.charAt(0) === '-' ? -1 : 1;
	const sortField = sortState.charAt(0) === '-' ? sortState.substr(1) : sortState;

	return (giftA: Gift, giftB: Gift): number => {

		switch(typeof giftA[sortField]){
			case 'string':
				return (giftA[sortField].localeCompare(giftB[sortField])) * reverse;
			case 'number':
				return (giftA[sortField] - giftB[sortField]) * reverse;
			default:
				return 0;
		}
	};
};