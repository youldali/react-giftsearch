import React from 'react';

const gift = ({ giftList }) => (
 <div>
	{giftList.map((gift) => (
	  <div
	    key={gift.id}	    
	  >
	  	{gift.name} {gift.price} == {gift.rawPrice}
	  </div>
	))}
 </div>
);

export default gift;