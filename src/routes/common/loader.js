//@flow

import React from 'react';
import { Container, Icon } from 'semantic-ui-react';

const Loader = () => (
	<Container textAlign='center'>
	  <Icon 
	    loading 
	    name='spinner'
	    size='huge'
	    color='blue'
	   />
	</Container>
)

export default
Loader;

