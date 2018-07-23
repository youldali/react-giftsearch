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
        '847':  {propertyName: '1Night', propertyValue: 1},
        '862':  {propertyName: '2Nights', propertyValue: 1},
        '868':  {propertyName: '3Nights', propertyValue: 1},
    },
    multi: false,
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
        values: [boxTypes, numberOfNights, experienceTypes],
    }
};

module.exports = boxCollectionsConfig;