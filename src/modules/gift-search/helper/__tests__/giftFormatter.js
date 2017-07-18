import * as giftFormatter from '../giftFormatter';
import { formatGiftConfig } from 'config';

const mockCloudSearchTuple1 = {  
   "id":"239311",
   "activity_name":"",
   "category":[  
      "Pour deux personnes",
      "Par region",
   ],
   "category_facet":[  
      870,
      886,
      926
   ],
   "city":"",
   "cloud_position":500000,
   "department":"",
   "department_iso":[  
      "FR-50"
   ],
   "department_facet":[  
      "187"
   ],
   "description":"Dans la magnifique baie du Mont-Saint-Michel, Cap Anglo vous invite sur l\u2019un de ses bateaux de 14 m\u00e8tres \u00e0 mettre le cap sur Jersey, la plus grande des \u00eeles Anglo-Normandes, au cours d\u2019un s\u00e9jour unique avec nuit en cabine. Depuis le port de Granville, l\u2019entreprise organise des stages, sorties en mer et croisi\u00e8res d\u2019un ou plusieurs jours en voilier avec des chefs de bord professionnels brevet\u00e9s, \u00e0 destination des plus jolies destinations de l\u2019Ouest du Cotentin. Votre itin\u00e9raire vers Jersey vous portera par l\u2019archipel de Chausey ou Les Minquiers, \u00eelots sauvages et venteux aux airs de bout du monde. Embarquez avec l\u2019\u00e9quipage et prenez part aux man\u0153uvres des voiles et \u00e0 la vie \u00e0 bord, entre farniente, lecture, baignade, p\u00eache ou photographie. Au c\u0153ur des eaux aux mille reflets de la Manche, vous vous sentirez l\u2019\u00e2me d\u2019un aventurier et savourerez ce grand bol d\u2019air marin avec d\u00e9lectation.",
   "name":"2 jours sur un voilier \u00e0 destination de Jersey",
   "partner_name":"",
   "price":"279,90 €",
   "ranking":137,
   "rating":"0,0",
   "region":"",
   "region_iso":[  
      "FR-P"
   ],
   "region_facet":[  
      "185"
   ],
   "short_description":"",
   "sku":"L142",
   "store_id":"1",
   "subcategory":[  

   ],
   "subcategory_facet":[  

   ],
   "subtitle":"",
   "thematic_sku":"L142",
   "thematic_name":"2 jours sur un voilier \u00e0 destination de Jersey",
   "type":"thematic",
   "type_experience":[  
      "1147"
   ],
   "universe":[  
      "Multi-th\u00e8mes"
   ],
   "universe_facet":[  
      101
   ],
   "original_name":"2 jours de navigation avec nuit sur un voilier \u00e0 destination de l'\u00eele de Jersey, dans la Manche",
   "cs_visibility":[  
      "1",
      "2"
   ],
   "special_price":"279,90\u00a0\u20ac",
   "e_urls":{  

   },
   "url":"http:\/\/local.smartbox.com\/fr\/nos-smartbox\/multi-themes\/voilier-granville-l142.html",
   "img":"http:\/\/media.smartbox.com\/media\/catalog\/product\/L142\/L142_listing.jpg?thumbor=280x0",
   "img_large":"http:\/\/media.smartbox.com\/media\/catalog\/product\/L142\/L142_listing.jpg?thumbor=280x0",
   "img_small":"http:\/\/media.smartbox.com\/media\/catalog\/product\/L142\/L142_listing.jpg?thumbor=640x0",
   "reviews_count":0,
   "rating_class":"rating__star",
   "show_rating":false,
   "nb_personnes":"1-2",
   "web_exclusive":true,
   "reservable":"0",
   "delivery_format":"ebox",
   "sev_location":"Basse-Normandie, Granville (50)",
   "product_type":"1030",
   "thematic_type":"sev",
   "promotion_sticker":"<div class=\"widget widget-banner\">\n        <ul>\n            <\/ul>\n<\/div>",
   "number_activities":1
}

const mockCloudSearchTuple2 = {
 "id":"239329",
 "activity_name":"",
 "category":[  
    "Par region",
    "Exclusivite web",
    "Une nuit"
 ],
 "category_facet":[  
    886,
    926,
    928
 ],
 "city":"",
 "cloud_position":500000,
 "department":"",
 "department_iso":[  
    "FR-94"
 ],
 "department_facet":[  
    "205"
 ],
 "description":"Et si Versailles vous \u00e9tait cont\u00e9 de mani\u00e8re totalement in\u00e9dite, \u00e0 bord d\u2019une luxueuse voiture ancienne ? C\u2019est l\u2019exp\u00e9rience unique que vous propose de vivre Paris Balade. Fort d\u2019un Certificat d\u2019Excellence et de 100 % de clients satisfaits sur TripAdvisor, ce sp\u00e9cialiste de la visite guid\u00e9e en voiture de collection mettra \u00e0 votre disposition l\u2019un de ses chauffeurs-guides \u00e9rudits pour une balade de plus de quatre heures. En famille ou entre amis, vous vous installerez dans une Mercedes 280 SE, petite merveille de 1970 aux lignes \u00e9pur\u00e9es avec boiseries int\u00e9rieures et moteur 6 cylindres. Au d\u00e9part de Paris, vous prendrez la direction du ch\u00e2teau du Roi Soleil et en parcourrez les fabuleux jardins orn\u00e9s de fontaines dessin\u00e9s par Andr\u00e9 Le N\u00f4tre. Vous admirerez l\u2019architecture \u00e9blouissante du palais, avant d\u2019aller explorer le Domaine de Marie-Antoinette, havre d\u2019intimit\u00e9 de la reine. Les anecdotes passionnantes de votre pilote sublimeront ce merveilleux voyage dans l\u2019Histoire.",
 "name":"Visitez le Ch\u00e2teau de Versailles en Mercedes de collection",
 "partner_name":"",
 "price":"299,90 €",
 "ranking":999,
 "rating":"0,0",
 "region":"",
 "region_iso":[  
    "FR-J"
 ],
 "region_facet":[  
    "66"
 ],
 "short_description":"",
 "sku":"L154",
 "store_id":"1",
 "subcategory":[  

 ],
 "subcategory_facet":[  

 ],
 "subtitle":"",
 "thematic_sku":"L154",
 "thematic_name":"Visitez le Ch\u00e2teau de Versailles en Mercedes de collection",
 "type":"thematic",
 "type_experience":[  
    "1145"
 ],
 "universe":[  
    "Multi-th\u00e8mes"
 ],
 "universe_facet":[  
    101
 ],
 "original_name":"4h30 de balade en Mercedes de collection \u00e0 la d\u00e9couverte du Ch\u00e2teau de Versailles pour 4 personnes",
 "cs_visibility":[  
    "1",
    "2"
 ],
 "special_price":"279,90\u00a0\u20ac",
 "e_urls":{  

 },
 "url":"http:\/\/local.smartbox.com\/fr\/nos-smartbox\/multi-themes\/visite-en-mercedes-versailles-l154.html",
 "img":"http:\/\/media.smartbox.com\/media\/catalog\/product\/L154\/L154_listing.jpg?thumbor=280x0",
 "img_large":"http:\/\/media.smartbox.com\/media\/catalog\/product\/L154\/L154_listing.jpg?thumbor=280x0",
 "img_small":"http:\/\/media.smartbox.com\/media\/catalog\/product\/L154\/L154_listing.jpg?thumbor=640x0",
 "reviews_count":0,
 "rating_class":"rating__star",
 "show_rating":false,
 "nb_personnes":"3-4",
 "web_exclusive":true,
 "reservable":"0",
 "delivery_format":"ebox",
 "sev_location":"\u00cele-de-France, Champigny-sur-Marne (94)",
 "product_type":"1030",
 "thematic_type":"sev",
"promotion_sticker":"<div class=\"widget widget-banner\">\n        <ul>\n            <\/ul>\n<\/div>",
 "number_activities":1
};

const mockCloudSearchCollection = [mockCloudSearchTuple1, mockCloudSearchTuple2];

beforeAll(() => {
	formatGiftConfig.fieldsToKeep = ["id", "category", "price"];
});

describe('getRawPrice', () => {

	test('it should return the price (number) for a formatted price', () => {
		const formattedPrice = '121,90 €';
		const expectedPrice = 121.9;
		expect(giftFormatter.getRawPrice(formattedPrice)).toBe(expectedPrice);

		const formattedPrice2 = '189789,908 €';
		const expectedPrice2 = 189789.908;
		expect(giftFormatter.getRawPrice(formattedPrice2)).toBe(expectedPrice2);			
	});	

});

describe('getAmountOfNights', () => {

	test('it should 0 night when no night category is present', () => {
		const category = ["Séjour gourmand", "gastronomy", "sports"];
		const expectedTuple = [0, 0];
		expect(giftFormatter.getAmountOfNights(category)).toEqual(expectedTuple);
	});	


	test('it should 1 night when "Une nuit" category is present', () => {
		const category = ["Séjour gourmand", "gastronomy", "sports", "Une nuit"];
		const expectedTuple = [1, 1];
		expect(giftFormatter.getAmountOfNights(category)).toEqual(expectedTuple);
	});			

	test('it should 2 nights when "Deux nuits" category is present', () => {
		const category = ["Séjour gourmand", "gastronomy", "sports", "Deux nuits"];
		const expectedTuple = [2, 2];
		expect(giftFormatter.getAmountOfNights(category)).toEqual(expectedTuple);
	});		

	test('it should 1 or 2 nights when "Une nuit" AND "Deux nuits" category are present', () => {
		const category = ["Séjour gourmand", "Une nuit", "gastronomy", "sports", "Deux nuits"];
		const expectedTuple = [1, 2];
		expect(giftFormatter.getAmountOfNights(category)).toEqual(expectedTuple);
	});		

});


describe('getAmountOfPersons', () => {

	test('it should return 2 persons only', () => {
		const nb_pers = '2';
		const expectedTuple = [2, 2];
		expect(giftFormatter.getAmountOfPersons(nb_pers)).toEqual(expectedTuple);		
	});	

	test('it should return 1 person only', () => {
		const nb_pers = '1';
		const expectedTuple = [1, 1];
		expect(giftFormatter.getAmountOfPersons(nb_pers)).toEqual(expectedTuple);		
	});

	test('it should return 1 or 2 persons', () => {
		const nb_pers = '1-2';
		const expectedTuple = [1, 2];
		expect(giftFormatter.getAmountOfPersons(nb_pers)).toEqual(expectedTuple);		
	});

	test('it should return 2 or 6 persons', () => {
		const nb_pers = '2-6';
		const expectedTuple = [2, 6];
		expect(giftFormatter.getAmountOfPersons(nb_pers)).toEqual(expectedTuple);		
	});		

});

describe('filterObjectProperties', () => {

	test('it should filter the properties', () => {
		const expectedObject = {
			"id":"239311",
			"category": ["Pour deux personnes","Par region"],
	   	"price":"279,90 €"
		};

		expect(giftFormatter.filterObjectProperties(mockCloudSearchTuple1)).toEqual(expectedObject);			
	});	

});

describe('formatGiftInfos', () => {

	test('it return a Gift Object', () => {
		const expectedObject = {
			"id":"239311",
			"category":[  "Pour deux personnes","Par region"],
	   	"price":"279,90 €",
	   	"min_persons": 1,
			"max_persons": 2,
			"min_nights": 0,
			"max_nights": 0,
			"rawPrice": 279.9
		};

		expect(giftFormatter.formatGiftInfos(mockCloudSearchTuple1)).toEqual(expectedObject);			
	});	

});

describe('formatGiftCollection', () => {

	test('it return a Gift Collection', () => {
		const expectedObject1 = {
			"id":"239311",
			"category":[  "Pour deux personnes","Par region"],
	   	"price":"279,90 €",
	   	"min_persons": 1,
			"max_persons": 2,
			"min_nights": 0,
			"max_nights": 0,
			"rawPrice": 279.9
		};

		const expectedObject2 = {
			"id":"239329",
			"category":["Par region", "Exclusivite web", "Une nuit"],
	   	"price":"299,90 €",
	   	"min_persons": 3,
			"max_persons": 4,
			"min_nights": 1,
			"max_nights": 1,
			"rawPrice": 299.9
		};		

		const expectedCollection = [expectedObject1, expectedObject2];

		expect(giftFormatter.formatGiftCollection(mockCloudSearchCollection)).toEqual(expectedCollection);			
	});	

});

