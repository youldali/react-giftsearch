const 
    config = require('./mockBox.config'),
    numberHelper = require('../helpers/number');


const generateBox = id => {
    const 
        name = 'box - ' + id,
        experienceTypes = numberHelper.getRandomValuesInArray(config.experienceTypes),
        regions = numberHelper.getRandomValuesInArray(config.regions),
        numberOfNights = numberHelper.generateNumbers(4, 1),
        numberOfPeople = numberHelper.getRandomValuesInArray(config.numberOfPeople),
        price = numberHelper.generateNumber(1000),
        boxTypes = numberHelper.getRandomValuesInArray(config.boxTypes),
        rating = numberHelper.generateFloatInRange(0, 10, 1),
        img = 'http://media.smartbox.com/pim/10000003771481081850179.jpg?thumbor=280x0/filters:quality(90)',
        sortValue = numberHelper.generateFloatInRange(0, 10, 1),
        numberOfReviews = numberHelper.generateNumber(15000);

    const mockBox = {
        id,
        name,
        price,
        experienceTypes,
        regions,
        numberOfNights,
        numberOfPeople,
        boxTypes,
        rating,
        img,
        sortValue,
        numberOfReviews,
    }

    mockBox.description = JSON.stringify(mockBox);
    return mockBox;
};

module.exports = generateBox;