//@flow
import type { FilterBlockConfigByFilterGroup, FilterBlockConfigByUniverse } from '../types';

import proxyObject from 'helpers/dataStructure/proxyObject';

const 
	blockBase: FilterBlockConfigByFilterGroup = {
		price: {label: 'Par prix'},
		experienceTypes: {label: "Par type d' expérience"},
		boxTypes: {label: 'Par type de coffret'},
		numberOfPeople: {label: 'Par nombre de personnes'},
	},
	defaultBlock = {label: 'Autres critères'};

const 
	sejourFilterBlock: FilterBlockConfigByFilterGroup = {
		...blockBase,
		numberOfNights: {label: 'Par nombre de nuits'},
	}, 
	mock1000FilterBlock: FilterBlockConfigByFilterGroup = {
		...blockBase,
		numberOfNights: {label: 'Par nombre de nuits'},
	};

const filterBlocksPerUniverse: FilterBlockConfigByUniverse = {
	sejour: proxyObject(sejourFilterBlock, defaultBlock),
	"mock-1000": proxyObject(mock1000FilterBlock, defaultBlock),
}

export default filterBlocksPerUniverse;