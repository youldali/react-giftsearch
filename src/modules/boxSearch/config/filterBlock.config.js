//@flow
import createObjectWithDefault from 'helpers/dataStructure/objectWithDefault';

const 
	blockBase = {
		price: {label: 'Par prix'},
		experienceType: {label: "Par type d' expérience"},
		boxType: {label: 'Par type de coffret'},
	},
	defaultBlock = {label: 'Autres critères'};

const 
	sejourFilterBlock = {
		...blockBase,
		night: {label: 'Par nombre de nuits'},
	};

const filterBlocksPerUniverse = {
	sejour: createObjectWithDefault(sejourFilterBlock, defaultBlock)
}

export default filterBlocksPerUniverse;