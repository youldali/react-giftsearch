//@flow

import React from 'react';
import { Card, Icon, Image } from 'semantic-ui-react';
import IconForPersons from './iconsForPersons';

export
const GiftCard = (props) => {
  
  return (
    <Card href={props.url}>
      <Image src={props.img} />
      <Card.Content>
        <Card.Header>
          {props.name}
        </Card.Header>
        <Card.Description>
        </Card.Description>
      </Card.Content>
      <Card.Content extra>
        <IconForPersons minPersons={props.minPersons} maxPersons={props.maxPersons} />
        {props.price}
      </Card.Content>
    </Card>
  );  

};

