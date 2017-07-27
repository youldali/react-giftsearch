//@flow

import React from 'react';

const gift = ({ giftList }) => (
 <div>
	{giftList.map((gift) => (
	  <div
	    key={gift.id}	    
	  >
	  	{gift.name} Price: {gift.rawPrice} - minPers: {gift.min_persons} - minPers: {gift.max_persons}
	  </div>
	))}
 </div>
);

export default gift;