//@flow
import type { GiftCollection } from 'modules/actions/types';
import React from 'react'
import GiftListContainer from './gift-list/giftList';
import { Grid } from 'semantic-ui-react'
import FilterContainer from './filters/filterContainer';

const GiftSearchContainer = () => (
  <div className="App">
	  <div className="gift-search">
	    <h2>Welcome to Gift Search</h2>
	  </div>
	  
	  
	  
	   <Grid columns={16} >
	    <Grid.Row centered>
	      <Grid.Column widescreen={3} largeScreen={3} tablet={4}  >
					<FilterContainer /> 	
	      </Grid.Column>
	      <Grid.Column widescreen={8} largeScreen={9} tablet={12}>
	        <GiftListContainer />
	      </Grid.Column>
	    </Grid.Row>
	   </Grid>
	</div>
);

export default GiftSearchContainer;