//@flow

import React from 'react'
import { withRouter } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import NavBar from '../common/navBar/navBar';

/*
import GiftListContainer from './gift-list/giftList';
import FiltersWrapper from './gift-list-refinement/filtersWrapper';
import StatusBar from './gift-list-refinement/statusBar';
import GiftListElacticSearch from 'routes/gift-search/gift-list-refinement/elacticSearch';
*/

const BoxSearchLayout =  () => {
	const NavBarConnected = withRouter(NavBar);

	return (
		<div>
			<Grid container spacing={24}>
				<Grid item xs={12}>
          <NavBarConnected />
				</Grid>
			</Grid>
		</div>
	)
};

export default BoxSearchLayout;