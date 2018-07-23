// @flow

import type { IndexConfig, FieldsToIndex, FieldsToIndexByUniverse } from '../types';

export const dbName = 'smartbox-box-search';
export const dbVersion = 1;

const fieldsToIndexBase = {
    id: null,
    price: null,
    rating: null,
    experienceTypes: {multiEntry: true},
    regions: {multiEntry: true},
    boxTypes: {multiEntry: true},
    numberOfPeople: {multiEntry: true},
    sortValue: null,
};

export
const fieldsToIndexByUniverse: FieldsToIndexByUniverse = {
    aventure: { 
        ...fieldsToIndexBase, 
        'extreme': null
    },
    sejour: { 
        ...fieldsToIndexBase, 
        numberOfNights: {multiEntry: true},
    },
    "mock-1000": { 
        ...fieldsToIndexBase, 
        numberOfNights: {multiEntry: true},
    },
};

export default {
    dbName,
    dbVersion,
    fieldsToIndexByUniverse
};