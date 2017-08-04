//@flow
import type { GiftCollection } from 'modules/actions/types';
import React, { Component } from 'react'
import GiftListContainer from './gift-list/giftList';
import { Grid, Sticky } from 'semantic-ui-react'
import FilterContainer from './filters/filterContainer';

class GiftSearchContainer extends Component {
	state = {}
  handleContextRefSticky = contextRefSticky => this.setState({ contextRefSticky })
  
	render(){
		const { contextRefSticky } = this.state
		return(
			<Grid columns={16} >
				<Grid.Row centered>
				  <Grid.Column widescreen={3} largeScreen={3} tablet={4}  >
						<Sticky context={contextRefSticky}><FilterContainer /></Sticky>
				  </Grid.Column>
				  <Grid.Column widescreen={8} largeScreen={9} tablet={12}>
				  	<div ref={this.handleContextRefSticky}>
				    	<GiftListContainer />
				    </div>
				  </Grid.Column>
				</Grid.Row>
			</Grid>
		)
	}
};

export default GiftSearchContainer;