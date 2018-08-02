//@flow

import type { RouterLocation } from 'modules/actions/types';

import React from 'react'
import OrderByMenu from './orderByMenu';
import UniverseMenu from './universeMenu';
import FilterMenu from './filterButton';
import Grid from '@material-ui/core/Grid';


import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';

const styles = {
	toolbar: {
		alignItems: 'stretch',
	}
};

const navBar = (props) => {
	return(
		<AppBar position="fixed" color="default">
			<Toolbar disableGutters={true} classes={{root: props.classes.toolbar}}>
				<UniverseMenu />
				<OrderByMenu />
				<FilterMenu />
			</Toolbar>
		</AppBar>
  );
}

export default withStyles(styles)(navBar);