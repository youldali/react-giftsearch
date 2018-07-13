//@flow

import type { RouterLocation } from 'modules/actions/types';

import React from 'react'
import OrderByMenu from './orderByMenu';
import UniverseMenu from './universeMenu';
import FilterMenu from './filterButton';
import Grid from '@material-ui/core/Grid';

const menuStyles = {
  button: {
    height: '100%',
  },
};

const navBar = () => {
	return(
		<Grid container spacing={8}>
			<Grid item xs={4}>
				<UniverseMenu />
			</Grid>
			<Grid item xs={4}>
				<OrderByMenu menuStyles={menuStyles} />
			</Grid>
			<Grid item xs={4}>
				<FilterMenu />
			</Grid>
		</Grid>
  );
}

export default navBar;