//@flow

import type { GiftCollection } from 'modules/actions/types';
import React, { Component } from 'react'
import GiftListContainer from './gift-list/giftList';
import { Grid } from 'semantic-ui-react'
import FiltersWrapper from './gift-list-refinement/filtersWrapper';
import StatusBar from './gift-list-refinement/statusBar';
import NavBar from '../common/navBar/navBar';
import { withRouter } from 'react-router-dom';
import GiftListElacticSearch from 'routes/gift-search/gift-list-refinement/elacticSearch';

const GiftSearchContainer =  () => {
	const NavBarConnected = withRouter(NavBar);

	return (
		<div>
			<Grid columns={16} >

				<Grid.Row centered>
					<Grid.Column widescreen={11} largeScreen={12} tablet={16}  >
						<NavBarConnected />
					</Grid.Column>
				</Grid.Row>

				<Grid.Row centered>
				
				  <Grid.Column widescreen={3} largeScreen={3} tablet={4}  >
						<FiltersWrapper />
				  </Grid.Column>

				  <Grid.Column widescreen={8} largeScreen={9} tablet={12}>
				  	<Grid.Row>
				  		<StatusBar />
				  	</Grid.Row>

						<Grid.Row style={{marginBottom: '1em'}}>
				    	<GiftListElacticSearch />
				    </Grid.Row>				  	

				  	<Grid.Row>
				    	<GiftListContainer />
				    </Grid.Row>
				  </Grid.Column>
				</Grid.Row>

			</Grid>
		</div>
	)
};

export default GiftSearchContainer;