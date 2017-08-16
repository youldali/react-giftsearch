//@flow

import type { GiftCollection } from 'modules/actions/types';
import React from 'react';
import { Card, Icon, Image } from 'semantic-ui-react';
import { IconPeople, IconEBox, IconPopular } from './icons';
import './css/card.css';

type GiftCardType = {
  url: string,
  img: string,
  name: string,
  subtitle: string,
  minPersons: number,
  maxPersons: number,
  price: string,
  rating: string,
  showRating: boolean,
  numberOfReviews: number,  
  webExclusive: boolean
};

export
const GiftCard = (props: GiftCardType) => (
  <Card href={props.url} color='orange' target='_blank'>
    <Image src={props.img} centered />
    <Card.Content>
      <Card.Header>
        {props.name}
      </Card.Header>
      <Card.Description>
        {props.subtitle}
      </Card.Description>
    </Card.Content>
    <Card.Content extra className='flex'>
      <span className='gift-card__icons'>
        <span><IconPeople minPersons={props.minPersons} maxPersons={props.maxPersons} /></span>
        { props.webExclusive && 
          <span><IconEBox /></span>
        }
        { props.showRating && props.rating >= '8' &&
          <span><IconPopular /></span>
        }    
      </span>
      <span className='gift-card__price'>{props.price}</span>
    </Card.Content>
  </Card>
);  


const GiftListCards = ({ giftCollection}: {giftCollection: GiftCollection }) => (
  <Card.Group itemsPerRow={3}>

    {giftCollection.map((gift) =>
      <GiftCard key={gift.id}
        name={gift.name}
        url={gift.url}
        img={gift.img}
        subtitle={gift.subtitle}
        minPersons={gift.min_persons}
        maxPersons={gift.max_persons}
        price={gift.price}
        webExclusive={gift.web_exclusive}
        rating={gift.rating}
        showRating={gift.show_rating}
        numberOfReviews={gift.reviews_count}        
      />
    )}
  </Card.Group>
);

export default GiftListCards;
