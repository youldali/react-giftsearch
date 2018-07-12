//@flow

import type { BoxCollection } from 'modules/actions/types';

import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import BoxCard from './boxCard';

const styles = {};
const _BoxCardList = ({ boxCollection, classes}: {boxCollection: BoxCollection, classes: Object }) => (
  <div>

    {boxCollection.map((box) =>
      <BoxCard key={box.id}
        name={box.name}
        url={box.url}
        img={box.img}
        subtitle={box.subtitle}
        minPersons={box.min_persons}
        maxPersons={box.max_persons}
        price={box.price}
        webExclusive={box.web_exclusive}
        rating={box.rating}
        showRating={box.show_rating}
        numberOfReviews={box.reviews_count}        
		description={box.description}
		classes={classes}
      />
    )}
  </div>
);

export default withStyles(styles)(_BoxCardList);
