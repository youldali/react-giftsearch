// @flow
import type { GiftCollection } from 'modules/actions/types';
import lunr from 'lunr';
import * as lunrUtil from 'helpers/lunr/utilities';
import * as lunrFr from 'helpers/lunr/fr';
import { getFromStorage, saveToStorage } from 'helpers/browser-storage/storage';




const normaliseSpelling = (builder: Object) => {

  const pipelineRemoveApostrophe = (token: Object) => {
      return token.update( str => lunrFr.removeApostrophe(str) );
  };

  const pipelineRemoveDiacritics = (token: Object) => {
      return token.update( str => lunrUtil.removeDiacritics(str) );
  };

  const pipelineToLowercase = (token: Object) => {
	  return token.update(str => lunrUtil.setToLowercase(str) );
	};

  const pipelineStopWordFilter = lunr.generateStopWordFilter(lunrFr.stopWords);

  lunr.Pipeline.registerFunction(pipelineRemoveApostrophe, 'removeApostrophe');
  lunr.Pipeline.registerFunction(pipelineRemoveDiacritics, 'removeDiacritics');
  lunr.Pipeline.registerFunction(pipelineStopWordFilter, 'stopWordFilterCustom');
  lunr.Pipeline.registerFunction(pipelineToLowercase, 'toLowercase');

  builder.pipeline.before(lunr.trimmer, pipelineToLowercase);
  builder.pipeline.before(lunr.trimmer, pipelineRemoveApostrophe);
  builder.pipeline.before(lunr.trimmer, pipelineStopWordFilter);
	builder.pipeline.before(lunr.trimmer, pipelineRemoveDiacritics);

	builder.searchPipeline.add(pipelineToLowercase);
	builder.searchPipeline.add(pipelineRemoveApostrophe);
  builder.searchPipeline.add(pipelineRemoveDiacritics);  
};

export const
createIndex = (collection: Array<Object>): Object => {
	return lunr(function () {
		console.log(this);
		//removed natived pipeline functions
		this.pipeline.remove(lunr.stemmer);
		this.searchPipeline.remove(lunr.stemmer);		

		//use custom pipeline
		this.use(normaliseSpelling);

	  this.ref('id');
	  this.field('name', { boost: 10 });
	  this.field('short_description');

	  collection.forEach(function (doc) {
	    this.add(doc)
	  }, this)
	});
};

export const
getResultsIds = (results: Array<Object>): Array<number> => {
	const resultsIds = [];
	for(let i = 0, length = results.length ; i < length; i++){
		resultsIds.push(parseInt(results[i].ref, 10));
	}

	return resultsIds;
};

export const
searchIndex = (searchString: string, lunrIndex: Object): Array<Object> => {
	const terms = searchString.trim().split(" ");
	return(
		lunrIndex.query(function (q) {
			for(let i = 0, length = terms.length ; i < length; i++){
				q.term(terms[i], {usePipeline: true, wildcard: lunr.Query.wildcard.TRAILING});
			}		
		})
	);
};

export const
getIndex = (universe: string, giftCollection: GiftCollection): Object => {
	const key = `${universe}-lunr-index`;
	return (
		getFromStorage(key)
			.then( serializedIndex => lunr.Index.load(JSON.parse(serializedIndex)) )
			.catch( e => {
				const lunrIndex = createIndex(giftCollection);
				saveToStorage(key, JSON.stringify(lunrIndex));
				return lunrIndex;
			})		
	);
}