import giftFetcher, { buildGiftUrl, fetchGiftsRemotely } from '../universeFetchGift';
import * as universeStorage from '../universeStorage';
import { cloudSearchConfig } from 'config';
import nock from 'nock';


beforeAll(() => {
	universeStorage.storageSaveGifts = jest.fn();
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
    jest.resetAllMocks();
  })

	test('it returns empty array when categories is undefined', () => {
		fetchGiftsRemotely('undefinedCategory')
			.then(giftBoxes => expect(giftBoxes).toEqual([]));
	});

	
	test('it returns empty array when http request has error status', () => {
		nock(cloudSearchConfig.baseUrl)
   		.get('/')
   		.query(true)
    	.reply(404, 'not found');

		fetchGiftsRemotely('gastronomy')
			.then(giftBoxes => expect(giftBoxes).toEqual([]));
	});

	test('it returns empty array when http request fails', () => {
		nock(cloudSearchConfig.baseUrl)
   		.get('/')
   		.query(true)
    	.replyWithError('network failure');

		fetchGiftsRemotely('gastronomy')
			.then(giftBoxes => expect(giftBoxes).toEqual([]));
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
    	
		fetchGiftsRemotely('gastronomy')
			.then(giftBoxes => {
				expect(giftBoxes).toEqual(responseBody.items);
				expect(universeStorage.storageSaveGifts.mock.calls.length).toBe(1);
			});
	});
})
