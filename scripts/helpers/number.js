const generateNumberInRange = (lowerBound, upperBound) => Math.floor(Math.random() * (upperBound - lowerBound) + lowerBound);
const generateFloatInRange = (lowerBound, upperBound, decimal = 1) => {
    const 
        rounder = 10 ** decimal,
        float = Math.random() * (upperBound - lowerBound) + lowerBound;

    return Math.round(float * rounder) / rounder;
}

const generateNumber = upperBound => Math.floor(Math.random() * upperBound);
const generateNumbers = (upperBound, nbToGenerate) => {
    const generatedNumbers = [];

    const withUpperBoundInferior = () => {
        for(let i = 0; i < upperBound; i++){
            generatedNumbers.push(i)
        }
        return generatedNumbers;
    };

    const withUpperBoundSuperior = () => {
        for(let i = 0; i < nbToGenerate; i++){
            const number = generateNumber(upperBound);
            if(generatedNumbers.indexOf(number) >= 0){
                i--;
                continue;
            }
            generatedNumbers.push(number)
        }
        return generatedNumbers;
    };

    return upperBound <= nbToGenerate ? withUpperBoundInferior() : withUpperBoundSuperior();
};

const getRandomValuesInArray = array => {
    const 
        numberOfElements = array.length,
        nbOfElementsToReturn = generateNumber(numberOfElements) + 1,
        indexes = generateNumbers(numberOfElements, nbOfElementsToReturn);

    return array.filter( (element, index) => indexes.indexOf(index) > -1);
}

module.exports = {
    generateNumberInRange,
    generateFloatInRange,
    generateNumber,
    generateNumbers,
    getRandomValuesInArray
};