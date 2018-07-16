//@flow
import type { Node } from 'react';

import React from 'react';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';

const styles = {
  button: {
    height: '100%',
  },
};

type MenuButton = {
    classes: Object,
    onClick: Function,
    text: string,
    icon: Node,
};

const menuButton = (props: MenuButton) => {
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