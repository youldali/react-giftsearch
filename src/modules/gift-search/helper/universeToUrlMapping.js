

const universeToUrlMap = {
	'well-being' : [844,864,880,885,924,846],
	'gastronomy' : [858,859,861,871,860,884,922,923],
	'adventure' : [851,867,850,887,879,849,881,925,929, 855],
	'occasion' : [873,882,870,883,877]
};


const buildGiftUrl = (categories: Array<number>): string => {
	const universeParameter = categories.reduce(
		(acc, category) => `${acc}&category[]=${category}`,
		''
	);
	const url = `//www.smartbox.com/fr/cloudsearch/search/thematic/?sortby=position&pagesize=1000${universeParameter}`;
	return url;
}

const fetchGifts = (universe : string): Promise<string> => {
	const categories = universeToUrlMap[universe];
	if(typeof categories === 'undefined')
		return new Promise((resolve, reject) => {
		  reject('Universe undefined');
		  console.log('Universe undefined');
		});

	const fetchConfig = {
		method: 'POST'
	};	
	const url = buildGiftUrl(categories);
	return fetch(url, fetchConfig)
					.then(response => response.json())
					.then((jsonData: Object) => jsonData.items);
					.catch(error => console.log('Error fetching Gift boxes', error));
}

export default fetchGifts;
