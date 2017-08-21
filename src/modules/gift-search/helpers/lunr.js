// @flow

import lunr from 'lunr';
import lunrStemmerSupport from 'lunr-languages/lunr.stemmer.support'
import lunrFr from 'lunr-languages/lunr.fr'

lunrStemmerSupport(lunr);
lunrFr(lunr);

export const
createIndex = (collection: Array<Object>): Object => {
	return lunr(function () {
		this.use(lunr.fr)
	  this.ref('id');
	  this.field('name', { boost: 10 });
	  this.field('short_description');

	  collection.forEach(function (doc) {
	    this.add(doc)
	  }, this)
	});
};

export const
getResultsIds = (results: Array<Object>): Array<mixed> => {
	const resultsIds = [];
	for(let i = 0, length = results.length ; i < length; i++){
		resultsIds.push(results[i].ref);
	}

	return resultsIds;
};

export const
searchIndex = (searchString: string, lunrIndex: Object): Object => {
	const terms = searchString.trim().split(" ");
	return(
		lunrIndex.query(function (q) {
			for(let i = 0, length = terms.length ; i < length; i++){
				console.log(terms[i]);
				q.term(terms[i], {editDistance: 2});
			}		
		})
	);
};