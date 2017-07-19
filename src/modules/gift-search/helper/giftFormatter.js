// @flow

import type { Gift, GiftCollection } from 'modules/actions/types';
import { formatGiftConfig } from 'config';

/*
 * Returns the price (number) given the formatted price
 */

export 
const getRawPrice = (formattedPrice: string): number => {
	const rawPrice = parseFloat(formattedPrice.replace(',', '.'));
	return rawPrice;
}

/*
 * Returns an array nbNights[min, max] based on the category array<string> field of cloudsearch
 */
export 
const getAmountOfNights = (category: Array<string>): [number, number] => {
	let amountNights = [0, 0];

	if(category.indexOf(formatGiftConfig.twoNights) >= 0){
		amountNights[1] = 2;
		amountNights[0] = category.indexOf(formatGiftConfig.oneNight) === -1 ? 2 : 1;
	}

	else if(category.indexOf(formatGiftConfig.oneNight) >= 0){
		amountNights = [1, 1];
	}

	return amountNights;
}

/*
 * Returns an array nbPers[min, max] based on the nb_pers string field of cloudsearch
 */
export 
const getAmountOfPersons = (nb_pers: string): [number, number] => {
	let nbPersArray = nb_pers.split('-');
	let amountOfPersons = [0, 0];

	for (const [i, val] of nbPersArray.entries()) {
    amountOfPersons[i] = parseInt(val, 10);
	}

	if(nbPersArray.length === 1)
		amountOfPersons[1] = amountOfPersons[0];

	return amountOfPersons;
}

/*
 * Filter the properties returned by Cloudsearch depending on the config
 */
export 
const filterObjectProperties = (giftInfos: Object): Object => {
	let filteredGift = {};

	for (const property of formatGiftConfig.fieldsToKeep) {
    filteredGift[property] = giftInfos[property];
	}

	return filteredGift;
}

/*
 * Returns a Gift object bases on the cloudsearch object
 */
export
const formatGiftInfos = (giftInfos: Object): Gift => {
	let gift = filterObjectProperties(giftInfos);
	const amountOfNight = getAmountOfNights(giftInfos.category);
	const amountOfPersons = getAmountOfPersons(giftInfos.nb_personnes)
	const rawPrice = getRawPrice(giftInfos.price);

	const addedProperties = {
		min_persons: amountOfPersons[0],
		max_persons: amountOfPersons[1],
		min_nights: amountOfNight[0],
		max_nights: amountOfNight[1],
		rawPrice
	};

	Object.assign(gift, addedProperties);

	return gift;
}

/*
 * Returns a Gift Collection from a cloudsearch collection
 */
export
const formatGiftCollection = (cloudsearchGiftCollection: Array<Object>): GiftCollection => {
	let giftCollection = [];
	for (const cloudsearchGift of cloudsearchGiftCollection) {
		const gift = formatGiftInfos(cloudsearchGift);
    giftCollection.push(gift);
	}	

	return giftCollection;
}
