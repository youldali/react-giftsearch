//@flow

import React from 'react'
import { withRouter } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import NavBar from '../common/navBar/navBar';

import BoxList from './boxList/boxList';


const boxData = [{"numberOfPeopleMin":2,"id":0,"price":89,"boxType":["e-Coffret","Experience unique","Excluweb"],"numberOfPeopleMax":2,"regions":["Pays de la Loire","Poitou-Charentes"],"description":"Offrez une nuit avec petit-déjeuner, dîner et accès au spa, pour 2 personnes","rating":7.1,"numberOfNights":1,"experienceTypes":["driving"],"name":"box - 0", "subtitle": "Échappez-vous pour une nuit avec petit-déjeuner et accès à l'espace détente pour 2 personnes "}];

const BoxSearchLayout =  () => {
	return (
		<div>
			<Grid container spacing={24}>
				<Grid item xs={12}>
          			<NavBar />
					<BoxList />
				</Grid>
			</Grid>
		</div>
	)
};

export default BoxSearchLayout;