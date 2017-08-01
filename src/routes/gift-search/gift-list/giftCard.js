//@flow

import React from 'react';
import { Card, Icon, Image } from 'semantic-ui-react';
import IconForPersons from './iconsForPersons';
import './css/giftCard.css';

type GiftCardType = {
  url: string,
  img: string,
  name: string,
  subtitle: string,
  minPersons: number,
  maxPersons: number,
  price: string
};

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
      <span className='gift-card__icons'><IconForPersons minPersons={props.minPersons} maxPersons={props.maxPersons} /></span>
      <span className='gift-card__price'>{props.price}</span>
    </Card.Content>
  </Card>
);  

export default GiftCard;

