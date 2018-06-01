import boxFetcher from '../fetchBoxListService';
import { boxesEndpointURL } from 'modules/boxSearch/config/api.config';
import nock from 'nock';

const 
	[fullURL, baseURL, page] = boxesEndpointURL.match(/(http[s]?:\/\/.*?)\/(.*)/);
describe('fetch gift boxes remotely', () => {
	afterEach(() => {
		nock.cleanAll();
	})
	
	test('it returns rejected promise when http request has error status', () => {
		nock(baseURL)
   		.get('/' + page)
   		.query(true)
    	.reply(404, 'not found');

    	return expect(boxFetcher('gastronomy')).rejects.toBeDefined();
	});

	test('it returns rejected Promise when http request fails', () => {
		nock(baseURL)
   		.get('/' + page)
   		.query(true)
    	.replyWithError('network failure');

    	return expect(boxFetcher('gastronomy')).rejects.toBeDefined();
	});
	
	test('it returns boxes when http request succeeds', () => {
		const responseBody = {
			items: [
				{name: 'superman', categorie: 'restaurant'},
				{name: 'adrenaline', categorie: 'cars'},
			]
		};

		nock('https://us-central1-smartbox-box-search.cloudfunctions.net')
   		.get('/listBoxes')
   		.query(true)
    	.reply(200, responseBody);
    	
		return expect(boxFetcher('gastronomy')).resolves.toEqual(responseBody);
	});
})
