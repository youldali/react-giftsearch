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
    boxType: {multiEntry: true},
    forPeople: {multiEntry: true}
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
        rating: null,
        experienceTypes: {multiEntry: true},
        regions: {multiEntry: true},
        boxType: {multiEntry: true},
    },
    "mock-1000": { 
        ...fieldsToIndexBase, 
        numberOfNights: null,
    },
};

export default {
    dbName,
    dbVersion,
    fieldsToIndexByUniverse
};