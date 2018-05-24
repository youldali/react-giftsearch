//@flow
import type { RouterLocation } from 'modules/actions/types';

import React from 'react'
import SimpleMenu from './orderByButton';
import FilterMenu from './filterButton';
import Grid from '@material-ui/core/Grid';


const navBar = ({location}: {location: RouterLocation}) => {
	return(
		<Grid container spacing={8}>
			<Grid item xs={4}>
				<SimpleMenu />
			</Grid>
			<Grid item xs={4}>
				<SimpleMenu />
			</Grid>
			<Grid item xs={4}>
				<FilterMenu />
			</Grid>
		</Grid>
  );
}

export default navBar;