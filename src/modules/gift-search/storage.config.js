// @flow

export type IndexConfig = ?{ multiEntry?: boolean, unique?: boolean };
export type FieldsToIndex = { [string]: IndexConfig };
export type FieldsToIndexByUniverse = { [string]: FieldsToIndex };

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