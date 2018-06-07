//@flow

import React from 'react'
import Person from '@material-ui/icons/Person';
import Couple from '@material-ui/icons/Group';
import Group from '@material-ui/icons/GroupAdd';
import Star from '@material-ui/icons/Star';
import StarHalf from '@material-ui/icons/StarHalf';
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

export
const IconRating = ({rating, numberOfReviews, className}: {rating: number, numberOfReviews: number}) => {	
	const
		numberBase5 = Math.round(rating) / 2,
		numberOfFullStars = Math.floor(numberBase5),
		hasHalfStar = Math.ceil(numberBase5 % 1);

	const getStarComponent = (numberOfFullStars, hasHalfStar) => {
		const stars = [];
		for(let i = 0; i < numberOfFullStars; i++){
			stars.push(<Star className={className} />);
		}
		hasHalfStar && stars.push(<StarHalf className={className}/>);
		return stars;
	};
	
 return (
	<React.Fragment>
		{getStarComponent(numberOfFullStars, hasHalfStar)}
  	</React.Fragment>
  );
}

const CardIcon = (props) => (
	<div >
        {props.forSolo && <IconSolo className={props.classes.icon} />}
        {props.forCouple && <IconCouple className={props.classes.icon} />}
        {props.forGroup && <IconGroup className={props.classes.icon} />}
	</div>
);

export default withStyles(styles)(CardIcon);
