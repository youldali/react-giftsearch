//@flow

import React from 'react'
import { withRouter } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import NavBar from '../common/navBar/navBar';

import BoxListContainer from './boxList/boxListContainer';

const BoxSearchLayout =  () => {
	return (
		<div>
			<Grid container spacing={0}>
				<Grid item xs={12}>
          			<NavBar />
					<BoxListContainer />
				</Grid>
			</Grid>
		</div>
	)
};

export default BoxSearchLayout;