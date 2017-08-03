//@flow

import React from 'react';
import { Item, Icon, Button } from 'semantic-ui-react';
import IconForPersons from './iconsForPersons';
import GiftRating from './giftRating';
import './css/giftItem.css';

type GiftItemType = {
  url: string,
  img: string,
  name: string,
  subtitle: string,
  minPersons: number,
  maxPersons: number,
  price: string,
  shortDescription: string,
  rating: string,
  showRating: boolean
};

const GiftItem = (props: GiftItemType) => (
	<Item className='gift-item'>
    <Item.Image src={props.img} as='a' size='small' href={props.url} target='_blank' />
    <Item.Content verticalAlign='middle'>
      <Item.Header>{props.name}</Item.Header>
      <Item.Meta>
      </Item.Meta>
      <Item.Description>
      	{props.subtitle}
      	<br />
      	{props.shortDescription}
      </Item.Description>
      <Item.Extra>
        <span className='gift-item__icons'><IconForPersons minPersons={props.minPersons} maxPersons={props.maxPersons} /></span>
        {props.showRating && <span className='gift-item__rating'><GiftRating rating={props.rating} /></span> }
    		<span className='gift-item__price'>{props.price}</span>
    		<Button floated='right' color='orange' as='a' href={props.url} target='_blank'>
          Consulter
          <Icon name='right chevron' />
        </Button>
      </Item.Extra>
    </Item.Content>
  </Item>
);  

export default GiftItem;