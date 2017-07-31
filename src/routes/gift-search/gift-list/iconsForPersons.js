//@flow

import React from 'react'
import { Icon, Popup } from 'semantic-ui-react'

export 
const IconSolo = () => {
	return (
		<Popup trigger={<span><Icon name='user' /></span>} >
      Experience solitaire
    </Popup>
	)
};

export 
const IconCouple = () => {
	return (
		<Popup trigger={<span><Icon name='male' /><Icon name='female' /></span>} >
      Parfait pour les couples
    </Popup>
	)
};

export 
const IconGroups = ({minPersons, maxPersons}: {minPersons: number, maxPersons: number}) => {
	return (
		<Popup trigger={<span><Icon name='users' /></span>} >
      Groupe De {minPersons} à {maxPersons} personnes !
    </Popup>
	)
};

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
