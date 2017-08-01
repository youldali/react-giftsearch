//@flow

import type { GiftCollection } from 'modules/actions/types';
import React from 'react';
import { Item } from 'semantic-ui-react';
import GiftItem from './giftItem';

const GiftListItems = ({ giftCollection}: {giftCollection: GiftCollection }) => (
  <Item.Group relaxed link>

    {giftCollection.map((gift) =>
      <GiftItem key={gift.id}
        name={gift.name}
        url={gift.url}
        img={gift.img}
        subtitle={gift.subtitle}
        shortDescription={gift.short_description}
        minPersons={gift.min_persons}
        maxPersons={gift.max_persons}
        price={gift.price}
      />
    )}
  </Item.Group>
);

export default GiftListItems;