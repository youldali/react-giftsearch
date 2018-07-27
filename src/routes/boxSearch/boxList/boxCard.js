//@flow

import type { BoxCollection } from 'modules/actions/types';
import React from 'react';
//import { IconPeople, IconEBox, IconPopular } from './icons';

import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import grey from '@material-ui/core/colors/grey';
import ImageWithPlaceholder from '../../common/ImageWithPlaceholder';
import CardIcon, {IconRating} from './CardIcon';

const cardMediaImageStyles = {
	root:{
		minWidth: '150px',
	},
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
		padding: '1rem .5rem',
		fontSize: '0.8rem',
		boxShadow: 'none',
		borderBottom: '1px solid #CCCCCC'
	},

	cardContentWrapper: {
		flexGrow: '1',
	},

	cardContent: {
		padding: '0 .5rem',

		'&:last-child': {
			padding: '0 .5rem',
		}
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


const boxCardPlaceholderStyle = Object.assign({}, boxCardStyles,
	{
		cardTitle: {
			height: '1.5rem',
			background: grey[200],
			marginBottom: '1rem',
		},

		cardDescription: {
			height: '4.5rem',
			background: grey[200],
		},
	}
)

const _BoxCardPlaceholder = ({classes}: {classes: Object}) => {
	return(
	<Card classes={{root: classes.card}}>
		<CardMediaImage />
		<div className={classes.cardContentWrapper}>
			<CardContent classes={{root: classes.cardContent}}>
				<div className={classes.cardTitle}></div>
				<div className={classes.cardDescription}></div>
			</CardContent>
		</div>
  	</Card>
)};
export const BoxCardPlaceholder = withStyles(boxCardPlaceholderStyle)(_BoxCardPlaceholder);


const _BoxCard = (props: BoxCardType) => {
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