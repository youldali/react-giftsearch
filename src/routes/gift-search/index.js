//@flow
import type { GiftCollection } from 'modules/actions/types';
import React from 'react'
import GiftListContainer from './gift-list/giftList';
import Filter from './filter';

const GiftSearchContainer = () => (
  <div className="App">
	  <div className="gift-search">
	    <h2>Welcome to Gift Search</h2>
	  </div>
	  
	  <Filter filterLabel='Prix max' filterName='maxPrice' filterForValue={60} />
	  <Filter filterLabel='Solo' filterName='forPersonsRange' filterForValue={1} />
	  <Filter filterLabel='Couple' filterName='forPersons' filterForValue={2} />
	  <GiftListContainer />
	</div>
);

export default GiftSearchContainer;