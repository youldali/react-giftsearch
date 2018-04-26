import boxFetcher from '../fetchBoxListRemotely';
import { boxesEndpointURL } from 'modules/gift-search/config/api.config';
import nock from 'nock';

describe('fetch gift boxes remotely', () => {
	afterEach(() => {
		nock.cleanAll();
	})
	
	test('it returns rejected promise when http request has error status', () => {
		nock(boxesEndpointURL)
   		.get('/')
   		.query(true)
    	.reply(404, 'not found');

    	return expect(boxFetcher('gastronomy')).rejects.toBeDefined();
	});

	test('it returns rejected Promise when http request fails', () => {
		nock(boxesEndpointURL)
   		.get('/')
   		.query(true)
    	.replyWithError('network failure');

    	return expect(boxFetcher('gastronomy')).rejects.toBeDefined();
	});
	
	test('it returns GiftBoxes when http request succeeds', () => {
		const responseBody = {
			items: [
				{name: 'superman', categorie: 'restaurant'},
				{name: 'adrenaline', categorie: 'cars'},
			]
		};

		nock(boxesEndpointURL)
   		.get('/')
   		.query(true)
    	.reply(200, responseBody);
    	
		return expect(boxFetcher('gastronomy')).resolves.toEqual(responseBody);
	});
})
