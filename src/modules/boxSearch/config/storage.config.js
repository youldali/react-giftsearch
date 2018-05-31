// @flow

import type { IndexConfig, FieldsToIndex, FieldsToIndexByUniverse } from '../types';

export const dbName = 'smartbox-box-search';
export const dbVersion = 1;

const fieldsToIndexBase = {
    id: null,
    price: null
};

export
const fieldsToIndexByUniverse: FieldsToIndexByUniverse = {
    aventure: { 
        ...fieldsToIndexBase, 
        'extreme': null
    },
    sejour: { 
        ...fieldsToIndexBase, 
        numberOfNights: null,
        numberOfPeopleMin: null,
        numberOfPeopleMax: null,
        rating: null,
        price: null,
        experienceTypes: {multiEntry: true},
        regions: {multiEntry: true},
        boxType: {multiEntry: true},
    }    
};

export default {
    dbName,
    dbVersion,
    fieldsToIndexByUniverse
};