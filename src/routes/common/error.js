//@flow

import React from 'react';
import { Message, Icon, Button } from 'semantic-ui-react';

export
const ErrorLoading = ( {actionRetry}: {actionRetry: Function} ) => (
	<Message warning>
    <Message.Header>Erreur de chargement</Message.Header>
    <p>
	    Veuillez vérifier votre connexion internet
	    <Button icon color='blue' style={{'margin-left': '1em'}} onClick={actionRetry} >
	      <Icon name='repeat' /> Réessayer 
	    </Button>
	   </p>
  </Message>
)

export
const ErrorNoResults = () => (
	<Message info>
    <Message.Header>Aucun rėsultat trouvé</Message.Header>
  </Message>
)



