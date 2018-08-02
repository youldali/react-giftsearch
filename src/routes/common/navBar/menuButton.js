//@flow
import type { Node } from 'react';

import React from 'react';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';

const styles = {
  iconWrapper: {
    marginRight: '.4rem',
  }
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
        fullWidth={true}
        >
        <span className={props.classes.iconWrapper}>{props.icon}</span>
        <span>{props.text}</span>
    </Button>
  );
}


export default withStyles(styles)(menuButton);