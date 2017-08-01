//@flow

import React from 'react';
import { Item, Icon, Button } from 'semantic-ui-react';
import IconForPersons from './iconsForPersons';
import './css/giftItem.css';

type GiftItemType = {
  url: string,
  img: string,
  name: string,
  description: string,
  subtitle: string,
  minPersons: number,
  maxPersons: number,
  price: string
};

const GiftItem = (props: GiftItemType) => (
	<Item className='gift-item' href={props.url} target='_blank'>
    <Item.Image src={props.img} size='medium'/>
    <Item.Content verticalAlign='middle'>
      <Item.Header>{props.name}</Item.Header>
      <Item.Meta>
      </Item.Meta>
      <Item.Description>
      	{props.subtitle}
      	<br /><br />
      	{props.shortDescription}
      </Item.Description>
      <Item.Extra>
        <span className='gift-item__icons'><IconForPersons minPersons={props.minPersons} maxPersons={props.maxPersons} /></span>
    		<span className='gift-item__price'>{props.price}</span>
    		<Button floated='right' color='orange'>
          Consulter
          <Icon name='right chevron' />
        </Button>
      </Item.Extra>
    </Item.Content>
  </Item>
);  

export default GiftItem;