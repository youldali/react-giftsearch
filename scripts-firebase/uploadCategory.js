const fetch = require('isomorphic-fetch');
const formatBoxCollection = require('./boxHelper/boxFormatter');

'coffret cadeau', 'e-coffret', 'experience unique', 'excluweb'
const experienceTypes = {
    'physical':  'coffret cadeau',
    'ebox':  'e-coffret',
    'dev':  'experience unique',
    'excluweb':  'coffret cadeau',
}
const categories = {
    sejour: 'http://www.smartbox.com/fr/cloudsearch/search/thematic/?sortby=position&pagesize=1000&universe[]=29&for=buyer',
}
const categoryName = process.argv[2];

if(!categories[categoryName]){
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
    db = admin.firestore(),
    collection = db.collection(categoryName);

const getBoxes = async () => {
    const response = await fetch(categories[categoryName]);

    if(!response.ok) 
		return Promise.reject(`Status: ${response.status} - ${response.statusText}`);
	
	const jsonData = await response.json();
	return jsonData.items;
}


const getFormattedBoxes = async () => {
    const boxes = await getBoxes();

    const slice = boxes.slice(0, 5);

    const formattedCollection = formatBoxCollection(slice);
    console.log(formattedCollection);
}

const getAllBoxIdMatchingParameter = async (parameter, parameterValue) => {
    const url = `${categories[categoryName]}&${parameter}=${parameterValue}`;
    const response = await fetch(categories[categoryName]);
    if(!response.ok) 
		return Promise.reject(`Status: ${response.status} - ${response.statusText}`);
	
	const jsonData = await response.json();
	return jsonData.items.map(item => item.id);
};

const addValueToItems = async (items, idList, propertyName, propertyValue) => {
    const matchingItems = items.filter(item => idList.indexOf(item.id) >= 0);
    matchingItems.forEach(item => item[propertyName] = propertyValue);
};

const addExperienceType = async items => {
    for(let [parameterValue, jsonValue] of Object.entries(experienceTypes)){
        const idList = await getAllBoxIdMatchingParameter('box_type[]', parameterValue);
        addValueToItems(items, idList, 'experienceTypes', jsonValue);
    }

    return items;
}

return getFormattedBoxes();
