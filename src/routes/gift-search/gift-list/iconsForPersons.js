//@flow

import React from 'react'
import { Icon, Popup } from 'semantic-ui-react'

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

export default 
({minPersons, maxPersons}: {minPersons: number, maxPersons: number}) => {
	
	if(maxPersons >= 3){
		return <IconGroups minPersons={minPersons} maxPersons={maxPersons} />;
	}
	else if(maxPersons === 2){
		if(minPersons === 2)
			return <IconCouple />;
		else
			return <IconSolo />;
	}
	else
		return <IconSolo />;

};
