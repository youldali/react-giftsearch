//@flow

import type { GiftCollection } from 'modules/actions/types';
import React, { Component } from 'react'
import GiftListContainer from './gift-list/giftList';
import { Grid, Sticky } from 'semantic-ui-react'
import FilterContainer from './gift-list-refinement/filterContainer';
import NavBar from '../common/navBar/navBar';

class GiftSearchContainer extends Component {
	state = {}
  handleContextRefSticky = (contextRefSticky: HTMLElement) => this.setState({ contextRefSticky })
  
	render(){
		const { contextRefSticky } = this.state
		return(
			<div ref={this.handleContextRefSticky}>
				<Grid columns={16} >
					<Grid.Row centered>
						<Grid.Column widescreen={11} largeScreen={12} tablet={16}  >
							<NavBar />
						</Grid.Column>
					</Grid.Row>
					<Grid.Row centered>
					  <Grid.Column widescreen={3} largeScreen={3} tablet={4}  >
							<Sticky context={contextRefSticky} offset={100}>
								<FilterContainer />
							</Sticky>
					  </Grid.Column>
					  <Grid.Column widescreen={8} largeScreen={9} tablet={12}>
					  	<div>
					    	<GiftListContainer />
					    </div>
					  </Grid.Column>
					</Grid.Row>
				</Grid>
			</div>
		)
	}
};

export default GiftSearchContainer;