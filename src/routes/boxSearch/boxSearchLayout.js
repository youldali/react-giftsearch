//@flow

import React from 'react'
import { withRouter } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import NavBar from '../common/navBar/navBar';

const BoxSearchLayout =  () => {
	return (
		<div>
			<Grid container spacing={24}>
				<Grid item xs={12}>
          <NavBar />
				</Grid>
			</Grid>
		</div>
	)
};

export default BoxSearchLayout;