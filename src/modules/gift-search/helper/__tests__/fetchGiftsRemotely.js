import giftFetcher, { buildGiftUrl } from '../fetchGiftsRemotely';
import * as giftFormatter from '../giftFormatter';
import { cloudSearchConfig } from 'config';
import nock from 'nock';


const mockFormatGiftCollection = jest.spyOn(giftFormatter, 'formatGiftCollection').mockImplementation(val => val);
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


describe('fetch gift boxes remotely', () => {

	afterEach(() => {
    nock.cleanAll();
  })

	test('it returns rejected Promise when categories is undefined', () => {
		return expect(giftFetcher('undefinedCategory')).rejects.toBeDefined();
	});

	
	test('it returns rejected promise when http request has error status', () => {
		nock(cloudSearchConfig.baseUrl)
   		.get('/')
   		.query(true)
    	.reply(404, 'not found');

    return expect(giftFetcher('gastronomy')).rejects.toBeDefined();
	});

	test('it returns rejected Promise when http request fails', () => {
		nock(cloudSearchConfig.baseUrl)
   		.get('/')
   		.query(true)
    	.replyWithError('network failure');

    return expect(giftFetcher('gastronomy')).rejects.toBeDefined();
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
    	
		return expect(giftFetcher('gastronomy')).resolves.toEqual(responseBody.items);
	});
})
