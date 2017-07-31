//@flow

import type { GiftCollection } from 'modules/actions/types';
import React from 'react';
import { Card } from 'semantic-ui-react';
import { GiftCard } from './giftCard';

const GiftListCards = ({ giftCollection}: {giftCollection: GiftCollection }) => (
  <Card.Group itemsPerRow={6}>

    {giftCollection.map((gift) =>
      <GiftCard key={gift.id}
        name={gift.name}
        url={gift.url}
        img={gift.img}
        minPersons={gift.min_persons}
        maxPersons={gift.max_persons}
        price={gift.price}
      />
    )}
  </Card.Group>
);

export default GiftListCards