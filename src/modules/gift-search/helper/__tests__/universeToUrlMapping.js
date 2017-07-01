import giftFetcher, { buildGiftUrl } from '../universeToUrlMapping';
import * as testa from '../universeToUrlMapping';
import { cloudSearchConfig } from 'config';
import nock from 'nock';

beforeAll(() => {
  cloudSearchConfig.baseUrl = "http://www.smartbox.com/?";
  cloudSearchConfig.universeToUrlMap = {
		"well-being" : [10,100,150],
		"gastronomy" : [1,2]
	};
});

test('it builds the correct url', () => {
	const categories = [50,75,200];
	const expectedUrl = cloudSearchConfig.baseUrl + '&category[]=50&category[]=75&category[]=200';
	expect(buildGiftUrl(categories)).toBe(expectedUrl);
})


describe('fetch gift boxes', () => {

	afterEach(() => {
    nock.cleanAll()
  })

	test('it returns undefined when categories is undefined', () => {
		giftFetcher('undefinedCategory')
			.then(giftBoxes => expect(giftBoxes).toBe(undefined));
	});

	
	test('it returns undefined when http request has error status', () => {
		nock(cloudSearchConfig.baseUrl)
   		.get('/')
   		.query(true)
    	.reply(404, 'not found');

		giftFetcher('gastronomy')
			.then(giftBoxes => expect(giftBoxes).toBe(undefined));
	});

	test('it returns undefined when http request fails', () => {
		nock(cloudSearchConfig.baseUrl)
   		.get('/')
   		.query(true)
    	.replyWithError('network failure');

		giftFetcher('gastronomy')
			.then(giftBoxes => expect(giftBoxes).toBe(undefined));
	});
	
	test('it returns GiftBoxes when http request succeeds', () => {
		const responseBody = {
			items: [
				{name: 'superman', categorie: 'restaurant'},
				{name: 'adrenaline', categorie: 'cars'},
			]
		};

		nock(cloudSearchConfig.baseUrl)
   		.get('/')
   		.query(true)
    	.reply(200, responseBody);
    	
		giftFetcher('gastronomy')
			.then(giftBoxes => expect(giftBoxes).toEqual(responseBody.items));
	});
})
