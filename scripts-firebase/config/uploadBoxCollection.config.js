const boxTypes = {
    parameter: 'box_type[]',
    newPropertyName: 'boxTypes',
    values: {
        'physical':  {propertyValue: 'coffret cadeau'},
        'ebox':  {propertyValue: 'e-coffret'},
        'dev':  {propertyValue: 'experience unique'},
        'excluweb':  {propertyValue: 'excluweb'},
    },
    multi: true,
};

const numberOfNights = {
    parameter: 'category[]',
    newPropertyName: 'numberOfNights',
    values: {
        '847':  {propertyValue: 1},
        '862':  {propertyValue: 2},
        '868':  {propertyValue: 3},
    },
    multi: true,
};

const numberOfPeople = {
    parameter: 'number_people[]',
    newPropertyName: 'numberOfPeople',
    values: {
        '2':  {propertyValue: 'couple'},
        '3&number_people[]=4&number_people[]=5':  {propertyValue: 'group'},
        '1':  {propertyValue: 'solo'},
    },
    multi: true,
};

const experienceTypes = {
    parameter: 'category[]',
    newPropertyName: 'experienceTypes',
    values: {
        '855':  {propertyValue: 'insolite'},
        '876':  {propertyValue: 'luxe'},
        '865':  {propertyValue: 'chateau'},
        '866':  {propertyValue: 'romantique'},
    },
    multi: true,
};


const boxCollectionsConfig = {
    sejour: {
        url: 'http://www.smartbox.com/fr/cloudsearch/search/thematic/?sortby=position&pagesize=1000&universe[]=29&for=buyer',
        values: [boxTypes, numberOfNights, experienceTypes, numberOfPeople],
    }
};

module.exports = boxCollectionsConfig;