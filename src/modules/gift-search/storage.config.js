// @flow

import type { IndexConfig, FieldsToIndex, FieldsToIndexByUniverse } from '../gift-search/types';

export const dbName = 'smartbox-gift-search';
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
        oneNight: null,
        twoNight: null,
        theme: {multiEntry: true}
    }    
};