//@flow

import React from 'react'
import Person from '@material-ui/icons/Person';
import Couple from '@material-ui/icons/Group';
import Group from '@material-ui/icons/GroupAdd';
import { withStyles } from '@material-ui/core/styles';

const styles = {
	icon: {
		color: 'orange',
		fontSize: '1.7rem',
	}
};

const IconSolo = (props) => (
	<Person {...props} />
);



const IconCouple = (props) => (
	<Couple {...props} />
);


const IconGroup = (props) => (
	<Group {...props} />
);

const CardIcon = (props) => (
	<div >
        {props.forSolo && <IconSolo className={props.classes.icon} />}
        {props.forCouple && <IconCouple className={props.classes.icon} />}
        {props.forGroup && <IconGroup className={props.classes.icon} />}
	</div>
);

export default withStyles(styles)(CardIcon);
