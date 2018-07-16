//@flow

import type { BoxCollection } from 'modules/actions/types';
import React from 'react';
//import { IconPeople, IconEBox, IconPopular } from './icons';

import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import ImageWithPlaceholder from '../../common/ImageWithPlaceholder';
import CardIcon, {IconRating} from './CardIcon';

const cardMediaImageStyles = {
	root:{
		minWidth: '150px',
	},
};


type CardMediaImageType = {
	classes: Object,
};

const _CardMediaImage = (props) => (
	<ImageWithPlaceholder
		maxWidth='280px'
		ratio='74.28%'
		classes={{root: props.classes.root, wrapper: props.classes.wrapper}}
		{...props}
	/>
)
const CardMediaImage = withStyles(cardMediaImageStyles)(_CardMediaImage);


const boxCardStyles = {
	card: {
		display: 'flex',
		margin: '1rem 0',
		padding: '0 0.5rem',
		fontSize: '0.8rem',
		boxShadow: 'none',
		borderBottom: '1px solid #CCCCCC'
	},

	cardContentWrapper: {
		flexGrow: '1',
	},

	cardContent: {
		padding: '1em',
	},

	cardMedia: {
		flexBasis: '150px',
	},

	cardAction:{
		display: 'flex',
		width: '100%',
	},

	cardTitle: {
		fontSize: '1.2em',
		fontWeight: 'bold',
		margin: 0,
	},

	cardPrice: {
		fontSize: '1.5em',
		fontWeight: 'bold',
	},

	cardIcons: {
		flexGrow: 1,
	},

	cardRating: {
		marginBottom: '1em',
	},

	cardRatingIcon: {
		color: '#f6b900',
		fontSize: '1.1em',
	}
};

type BoxCardType = {
	url: string,
	img: string,
	name: string,
	subtitle: string,
	minPersons: number,
	maxPersons: number,
	price: string,
	rating: number,
	showRating: boolean,
	numberOfReviews: number,  
	webExclusive: boolean,
	classes: Object,
};

const _BoxCard = (props: BoxCardType) => {
	console.log(props);
	return(
	<Card classes={{root:props.classes.card}}>
		<CardMediaImage
			source={props.img || "http://media.smartbox.com/pim/1000000401332886997373.jpg?thumbor=280x0"}
			title={props.name}
		/>
		<div className={props.classes.cardContentWrapper}>
			<CardContent classes={{root: props.classes.cardContent}}>
				<h3 className={props.classes.cardTitle}>{props.name}</h3>
				<div className={props.classes.cardRating}><IconRating rating={props.rating} className={props.classes.cardRatingIcon} numberOfReviews={100} /></div>
				<div>{props.subtitle}</div>
			</CardContent>

			<CardActions>
				<div className={props.classes.cardAction}>
					<span className={props.classes.cardIcons}><CardIcon forSolo /></span>
					<span className={props.classes.cardPrice}>{`${props.price} €`}</span>
				</div>
			</CardActions>
		</div>
  	</Card>
)};  
export default withStyles(boxCardStyles)(_BoxCard);