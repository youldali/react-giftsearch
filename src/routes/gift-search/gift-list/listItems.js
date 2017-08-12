//@flow

import type { GiftCollection } from 'modules/actions/types';
import React from 'react';
import { Item, Icon, Button, Image } from 'semantic-ui-react';
import './css/item.css';

import { IconPeople, IconRating } from './icons';

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

export
const GiftItem = (props: GiftItemType) => (
  <Item className='gift-item'>
    <Image src={props.img} as='a' href={props.url} size='medium' target='_blank' />
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
        <div className='flex'>
          <div className='gift-item__info-sup'>
            <span className='gift-item__icons'><IconPeople minPersons={props.minPersons} maxPersons={props.maxPersons} /></span>
            { props.showRating && 
              <span className='gift-item__rating'><IconRating rating={props.rating} /></span> 
            }
          </div>
          <div className='gift-item__price'>{props.price}</div>
        </div>
      </Item.Extra>
      <Button floated='right' color='orange' as='a' href={props.url} target='_blank'>
        Consulter
        <Icon name='right chevron' />
      </Button>
    </Item.Content>
  </Item>
);  


const GiftListItems = ({ giftCollection}: {giftCollection: GiftCollection }) => (
  <Item.Group divided>

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
        rating={gift.rating}
        showRating={gift.show_rating}
      />
    )}
  </Item.Group>
);

export default GiftListItems;
