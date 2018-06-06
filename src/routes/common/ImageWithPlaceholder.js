//@flow
import React from 'react';
import { withStyles } from '@material-ui/core/styles';

const styles = {
    root: {
	},
	wrapper:{
		background: '#DDDDDD',
		position: 'relative',
	},
	image: {
		position: 'absolute',
		top: 0,
		left:0,
		width: '100%',
   		height: '100%',
	},
};

export
const ImageWithPlaceholder = (props) => {
    console.log(props);
	return(
	<div 
		className={props.classes.root}
		style={{maxWidth: props.maxWidth}}
	>
        <div 
            className={props.classes.wrapper} 
            style={{paddingBottom: props.ratio}}
        >
			<img className={props.classes.image} src={props.source} title={props.title} alt={props.title} />
		</div>
	</div>
)};
export default withStyles(styles)(ImageWithPlaceholder);