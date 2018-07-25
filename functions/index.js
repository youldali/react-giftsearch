const 
    admin = require('firebase-admin'),
    functions = require('firebase-functions'),
    config = {
        apiKey: "AIzaSyBv3BXkTd-cvXNdHVn4SpGBTrwesBvH0Yw",
        authDomain: "smartbox-box-search.firebaseapp.com",
        databaseURL: "https://smartbox-box-search.firebaseio.com",
        projectId: "smartbox-box-search",
        storageBucket: "smartbox-box-search.appspot.com",
        messagingSenderId: "331008460095"
    };

admin.initializeApp();
const db = admin.firestore();

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });


//global object storing the boxes per universe, serving as cache for different requests
const boxCollectionPerUniverse = {};

const getAllBoxes = (universe) => {
    return (
        db.collection(universe).get()
        .then(snapshot => {
            const boxes = [];
            snapshot.forEach(doc => {
                boxes.push(doc.data());
            });
            return boxes;
        })
    );
};


exports.listBoxes = functions.https.onRequest( (req, res) => {
    
    const getBoxesFromFirestore = () => (
        getAllBoxes(universe)
            .then(boxCollection => {
                boxCollectionPerUniverse[universe] = boxCollection;
                return boxCollection;
            })
    );

    const getBoxesFromCache = () => Promise.resolve(boxCollectionPerUniverse[universe]);

    const 
        universe = req.query.universe,
        boxCollectionPromise = boxCollectionPerUniverse[universe] === undefined 
        ? getBoxesFromFirestore() 
        : getBoxesFromCache();

    res.append('Access-Control-Allow-Origin', '*');
    return (
        boxCollectionPromise
        .then(data => res.json({data}))
        .catch(err => {
            console.log('Error getting documents', err);
            res.status(500).send('Something broke!');
        })
    );
});
      
