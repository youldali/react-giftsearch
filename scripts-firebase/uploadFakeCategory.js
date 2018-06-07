const numberOfBoxes = parseInt(process.argv[2], 10);
const generateBox = require('./boxHelper/mockBox');

if(!numberOfBoxes){
    console.log('Please enter a positive number');
    return 1;
}

const 
    admin = require('firebase-admin'),
    serviceAccount = require("../private/smartbox-box-search-firebase-adminsdk.json"),
    functions = require('firebase-functions');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://smartbox-box-search.firebaseio.com"
});

const 
    db = admin.firestore(),
    collection = db.collection(`mock-${numberOfBoxes}`);

const generateBatch = (numberOfBoxes, idStart = 0) => {
    const batch = db.batch();

    for(let i = 0; i < numberOfBoxes; i++){
        const 
            id = i + idStart,
            mockBox = generateBox(id),
            ref = collection.doc(id.toString());
    
        batch.set(ref, mockBox);
    }
    
    return batch.commit().then(function () {
        console.log(`${numberOfBoxes} boxes added`);
    });
}

const uploadBoxes = numberOfBoxes  => {
    const
        batchCommitLimit = 500,
        numberOfBatches = Math.ceil(numberOfBoxes / batchCommitLimit);

    let numberOfBoxesRemaining = numberOfBoxes;

    for(let i = 0; i < numberOfBatches; i++){
        const numberOfBoxesToAdd = numberOfBoxesRemaining > batchCommitLimit ? batchCommitLimit : numberOfBoxesRemaining;
        generateBatch(numberOfBoxesToAdd, numberOfBoxes - numberOfBoxesRemaining);
        numberOfBoxesRemaining -= numberOfBoxesToAdd;
    }

    return 0;
}

return uploadBoxes(numberOfBoxes);