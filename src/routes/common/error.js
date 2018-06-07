//@flow

import React from 'react';
import Button from '@material-ui/core/Button';
import Repeat from '@material-ui/icons/Repeat';

export
const ErrorLoading = ( {actionRetry}: {actionRetry: Function} ) => (
	<div>
    <div>Erreur de chargement</div>
    <p>
	    Veuillez vérifier votre connexion internet
	    <Button style={{'marginLeft': '1em'}} onClick={actionRetry} >
	      <Repeat /> Réessayer 
	    </Button>
	   </p>
  </div>
)

export
const ErrorNoResults = () => (
	<div>
    <div>Aucun rėsultat trouvé</div>
  </div>
)



