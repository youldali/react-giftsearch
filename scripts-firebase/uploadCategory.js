const 
    fetch = require('isomorphic-fetch'),
    formatBoxCollection = require('./boxHelper/boxFormatter'),
    boxCollectionsConfig = require('./config/uploadBoxCollection.config'),
    Ramda = require('ramda');

const categoryName = process.argv[2];

if(!boxCollectionsConfig[categoryName]){
    console.log('Please enter a valid category name');
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
    db = admin.firestore();

const getBoxCollection = (collectionConfig) => {
    Ramda.composeP(uploadCollection(categoryName), addSpecificPropertiesToCollection(collectionConfig.url, collectionConfig.values), formatBoxes, getBoxes)(collectionConfig.url)

    return 1;
}

const _uploadCollection = (categoryName, items) => {
    const 
        firestoreCollection = db.collection(categoryName),
        batch = db.batch();

    for(let i = 0; i < items.length; i++){
        const 
            item = items[i],
            ref = firestoreCollection.doc(item.id.toString());
    
        batch.set(ref, item);
    }
    
    return batch.commit().then(function () {
        console.log(`${items.length} boxes added for ${categoryName} `);
    });
}
const uploadCollection = Ramda.curry(_uploadCollection)


const getBoxes = async url => {
    const response = await fetch(url);

    if(!response.ok) 
		return Promise.reject(`Status: ${response.status} - ${response.statusText}`);
	
	const jsonData = await response.json();
	return jsonData.items;
}

const formatBoxes = items => {
    const formattedCollection = formatBoxCollection(items);

    return formattedCollection;
}


const _addSpecificPropertiesToCollection = (baseUrl, groupsPropertiesConfig, items) => {

    const runThroughPropertyGroupConfig = async propertyGroupConfig => {
        for(let [parameterValue, newJsonConfig] of Object.entries(propertyGroupConfig.values)){
            const idList = await getAllBoxIdMatchingParameter(baseUrl, propertyGroupConfig.parameter, parameterValue);
            addValueToItems(items, idList, newJsonConfig.propertyName, newJsonConfig.propertyValue, propertyGroupConfig.multi);
        }

        return items;
    };

    const allPromises = groupsPropertiesConfig.map(runThroughPropertyGroupConfig);


    return Promise.all(allPromises).then( () => items);
}
const addSpecificPropertiesToCollection = Ramda.curry(_addSpecificPropertiesToCollection)


const _getAllBoxIdMatchingParameter = async (baseUrl, parameter, parameterValue) => {
    const url = `${baseUrl}&${parameter}=${parameterValue}`;
    const response = await fetch(url);
    if(!response.ok) 
		return Promise.reject(`Status: ${response.status} - ${response.statusText}`);
	
	const jsonData = await response.json();
	return jsonData.items.map(item => parseInt(item.id, 10));
};
const getAllBoxIdMatchingParameter = Ramda.curry(_getAllBoxIdMatchingParameter)


const addValueToItems = async (items, itemsIdMatching, propertyName, propertyValue, isMulti) => {
    const matchingItems = items.filter(item => itemsIdMatching.indexOf(item.id) >= 0);
    matchingItems.forEach(item => {
        !isMulti ? item[propertyName] = propertyValue
        : Array.isArray(item[propertyName]) 
        ? item[propertyName].push(propertyValue) 
        : item[propertyName] = [propertyValue]
    });
};

return getBoxCollection(boxCollectionsConfig[categoryName]);
