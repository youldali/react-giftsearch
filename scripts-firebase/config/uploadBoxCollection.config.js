const boxTypes = {
    parameter: 'box_type[]',
    values: {
        'physical':  {propertyName: 'boxTypes', propertyValue: 'coffret cadeau'},
        'ebox':  {propertyName: 'boxTypes', propertyValue: 'e-coffret'},
        'dev':  {propertyName: 'boxTypes', propertyValue: 'experience unique'},
        'excluweb':  {propertyName: 'boxTypes', propertyValue: 'excluweb'},
    },
    multi: true,
};

const numberOfNights = {
    parameter: 'category[]',
    values: {
        '847':  {propertyName: 'numberOfNights', propertyValue: 1},
        '862':  {propertyName: 'numberOfNights', propertyValue: 2},
        '868':  {propertyName: 'numberOfNights', propertyValue: 3},
    },
    multi: true,
};

const numberOfPeople = {
    parameter: 'number_people[]',
    values: {
        '1':  {propertyName: 'numberOfPeople', propertyValue: 'couple'},
        '3&number_people[]=4&number_people[]=5':  {propertyName: 'numberOfPeople', propertyValue: 'group'},
        '2':  {propertyName: 'numberOfPeople', propertyValue: 'solo'},
    },
    multi: true,
};

const experienceTypes = {
    parameter: 'category[]',
    values: {
        '855':  {propertyName: 'experienceTypes', propertyValue: 'insolite'},
        '876':  {propertyName: 'experienceTypes', propertyValue: 'luxe'},
        '865':  {propertyName: 'experienceTypes', propertyValue: 'chateau'},
        '866':  {propertyName: 'experienceTypes', propertyValue: 'romantique'},
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