//@flow

import React from 'react'
import { Rating } from 'semantic-ui-react'

const GiftRating = ({rating}: {rating: number | string}) => {
	const numberOfStars = Math.round(parseFloat(rating) / 2);
  return (
  	<Rating icon='star' rating={numberOfStars} maxRating={5} disabled />
  );
}

export default GiftRating;