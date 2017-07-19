// @flow

export 
const cloudSearchConfig = 
{
	"baseUrl": "//www.smartbox.com/fr/cloudsearch/search/thematic/?sortby=position&pagesize=1000",
	"universeToUrlMap": {
		"well-being" : [844,864,880,885,924,846],
		"gastronomy" : [858,859,861,871,860,884,922,923],
		"adventure" : [851,867,850,887,879,849,881,925,929, 855],
		"occasion" : [873,882,870,883,877]
	}
};

export 
const localforageConfig = {
	name: 'gift-finder-storage'
};


export 
const formatGiftConfig = {
	fieldsToKeep: [
		'id',
		'activity_name',
		'category',
		'city',
		'description',
		'name',
		'partner_name',
		'price',
		'ranking',
		'rating',
		'short_description',
		'sku',
		'store_id',
		'subtitle',
		'universe',
		'special_price',
		'url',
		'img',
		'show_rating',
		'number_activities',
		'reviews_count',
		'type_experience',
	],
	oneNight: 'Une nuit',
	twoNights: 'Deux nuits'
};

export
const filterConfig = {
	'maxPrice': [{ 'field': 'price', 'operator': '<=' }],
	'forPersons': [{ 'field': 'min_persons', 'operator': '>=' }, { 'field': 'max_persons', 'operator': '<=' }],
};


