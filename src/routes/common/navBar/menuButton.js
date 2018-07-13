//@flow

import React from 'react';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';

const styles = {
  button: {
    height: '100%',
  },
};

const menuButton = (props) => {
	return(
		<Button
      aria-haspopup="true"
      onClick={props.onClick}
      variant="raised" 
      color="secondary"
      fullWidth={true}
      className={props.classes.button}
    >
      {props.icon}
      {props.text}
    </Button>
  );
}


export default withStyles(styles)(menuButton);