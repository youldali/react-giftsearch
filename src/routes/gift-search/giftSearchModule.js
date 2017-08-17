//@flow

import type { GiftCollection } from 'modules/actions/types';
import React, { Component } from 'react'
import GiftListContainer from './gift-list/giftList';
import { Grid, Sticky } from 'semantic-ui-react'
import FilterContainer from './gift-list-refinement/filterContainer';
import OrderByDropdown from './gift-list-refinement/orderBy';
import DisplayAs from './gift-list-refinement/displayAs';
import NavBar from '../common/navBar/navBar';
import { withRouter } from 'react-router-dom';
import './giftSearchModule.css';

class GiftSearchContainer extends Component {
	state = {}
  handleContextRefSticky = (contextRefSticky: HTMLElement) => this.setState({ contextRefSticky })
  
	render(){
		const { contextRefSticky } = this.state
		const NavBarConnected = withRouter(NavBar);
		return(
			<div ref={this.handleContextRefSticky}>
				<Grid columns={16} >

					<Grid.Row centered>
						<Grid.Column widescreen={11} largeScreen={12} tablet={16}  >
							<NavBarConnected />
						</Grid.Column>
					</Grid.Row>

					<Grid.Row centered>

					  <Grid.Column widescreen={3} largeScreen={3} tablet={4}  >
							<FilterContainer />
					  </Grid.Column>

					  <Grid.Column widescreen={8} largeScreen={9} tablet={12}>
					  	<Grid.Row className='gift-list-refinement-bar'>
					  		<div>
					  			<DisplayAs value='list' icon='list layout' />
					  			<DisplayAs value='card' icon='grid layout' />
					  		</div>
					  		<OrderByDropdown />
					  	</Grid.Row>

					  	<Grid.Row>
					    	<GiftListContainer />
					    </Grid.Row>
					  </Grid.Column>
					</Grid.Row>

				</Grid>
			</div>
		)
	}
};

export default GiftSearchContainer;