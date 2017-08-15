//@flow

import React from 'react'
import { Icon, Popup, Rating } from 'semantic-ui-react'

export 
const IconSolo = () => (
	<Popup trigger={<span><Icon name='user' color='orange' size='large' /></span>} >
    Experience solitaire
  </Popup>
);

export 
const IconCouple = () => (
	<Popup trigger={<span><Icon name='male' fitted color='orange' size='large' /><Icon name='female' fitted color='orange' size='large' /></span>} >
    Parfait pour les couples
  </Popup>
);

export 
const IconGroups = ({minPersons, maxPersons}: {minPersons: number, maxPersons: number}) => (
	<Popup trigger={<span><Icon name='users' color='orange' size='large' /></span>} >
    Groupe De {minPersons} à {maxPersons} personnes !
  </Popup>
);

export
const IconPeople = ({minPersons, maxPersons}: {minPersons: number, maxPersons: number}) => {
	
	if(maxPersons >= 3){
		return <IconGroups minPersons={minPersons} maxPersons={maxPersons} />;
	}
	else if(maxPersons === 2){
		if(minPersons === 2)
			return <IconCouple />;
		else
			return <IconGroups minPersons={minPersons} maxPersons={maxPersons} />;
	}
	else
		return <IconSolo />;

};


export
const IconRating = ({rating, numberOfReviews}: {rating: number | string, numberOfReviews: number}) => {
	const numberOfStars = Math.round(parseFloat(rating) / 2);
  return (
		<Popup trigger={<Rating icon='star' rating={numberOfStars} maxRating={5} disabled />} >
	    Ce coffret a obtenu une moyenne de <strong>{rating}</strong> selon plus de {numberOfReviews} personnes
	  </Popup>  	
  	
  );
}

export
const IconEBox = () => {
  return (
		<Popup 
			trigger={
				<Icon.Group size='large'>
				  <Icon name='mail outline' />
				  <Icon corner name='edge' />
				</Icon.Group>
			} 
		>
	    Exclusivement sur note site !
	  </Popup>  	
  );
}



