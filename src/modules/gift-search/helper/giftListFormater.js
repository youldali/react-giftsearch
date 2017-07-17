// @flow
import { formatGiftConfig } from 'config';

type Gift = {
	id: string,
	activity_name: string,
	category: Array<string>,
	city: string,
	description: string,
	name: string,
	partner_name: string,
	price: string,
	ranking: number,
	rating: string,
	short_description: string,
	sku: string,
	store_id: string,
	subtitle: string,
	universe: Array<string>,
	special_price: string,
	url: string,
	img: string,
	show_rating: boolean,
	number_activities: number,
	reviews_count: number,
	type_experience: Array<string>,
	nb_pers-min: number,
	nb_pers-max: number,
	rawPrice: number
};


export 
const getNbPersInfos = (nb_pers: string): [number, ?number] {
	let nbPersArray = nb_pers.split('-');
	for (const [i, val] of nb_pers.entries()) {
    nb_pers[i] = parseInt(val, 10);
	}

	return nb_pers;
}

export 
const filterObjectProperties = (giftInfos: Object): Gift => {
	let filteredGift = {};

	//we filter fields
	for (const property of formatGiftConfig.fieldsToKeep) {
    filteredGift[property] = giftInfos[property];
	}

	return filteredGift;
}

export
const formatGiftInfos = (giftInfos: Object): Gift => {


}