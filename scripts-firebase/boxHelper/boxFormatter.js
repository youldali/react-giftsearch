const fieldsToKeep = {
	'id': 'id', 
	'img': 'img',
	'price': 'price',
	'reviews_count': 'numberOfReviews',
	'rating': 'rating',
	'name': 'name',
	'short_description': 'description',
	'subtitle': 'subtitle',
	'box_url': 'url',
}

/*
 * Returns the price (number) given the formatted price
 */
const getRawPrice = formattedPrice => {
	const rawPrice = parseFloat(formattedPrice.replace(',', '.').replace(' ', ''));
	return rawPrice;
};

/*
 * Filter the properties returned by Cloudsearch depending on the config
 */
const filterObjectProperties = rawBoxInfos => {
	let box = {};

	for (const [propertyName, newPropertyName] of Object.entries(fieldsToKeep)) {
    	box[newPropertyName] = rawBoxInfos[propertyName];
	}

	box['sortValue'] = parseFloat(rawBoxInfos['search_fields']['buyer_smart_value']);
	return box;
};

/*
 * Returns a Gift object bases on the cloudsearch object
 */
const formatBoxInfos = rawBoxInfo => {
	let box = filterObjectProperties(rawBoxInfo);

	box.price = getRawPrice(box.price);
	box.rating = parseFloat(box.rating);
	box.id = parseInt(box.id, 10);

	return box;
};

/*
 * Returns a Gift Collection from a cloudsearch collection
 */
const formatBoxCollection = cloudsearchBoxCollection => {
	let boxCollection = [];
	for (const cloudsearchBox of cloudsearchBoxCollection) {
		const box = formatBoxInfos(cloudsearchBox);
    	boxCollection.push(box);
	}	

	return boxCollection;
};

module.exports = formatBoxCollection;
