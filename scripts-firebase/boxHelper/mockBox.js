const 
    config = require('./mockBox.config'),
    numberHelper = require('../helpers/number');


const generateBox = id => {
    const 
        name = 'box - ' + id,
        experienceTypes = numberHelper.getRandomValuesInArray(config.experienceTypes),
        regions = numberHelper.getRandomValuesInArray(config.regions),
        numberOfNights = numberHelper.generateNumber(3),
        forPeople = numberHelper.getRandomValuesInArray(config.forPeople),
        price = numberHelper.generateNumber(1000),
        boxType = numberHelper.getRandomValuesInArray(config.boxTypes),
        rating = numberHelper.generateFloatInRange(0, 10, 1);

    const mockBox = {
        id,
        name,
        price,
        experienceTypes,
        regions,
        numberOfNights,
        forPeople,
        boxType,
        rating,
    }

    mockBox.description = JSON.stringify(mockBox);
    return mockBox;
};

module.exports = generateBox;