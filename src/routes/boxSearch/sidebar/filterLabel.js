import React from 'react';
import { withStyles } from '@material-ui/core/styles';

const styles = {
    labelContainer: {
        display: 'flex',
    },
    text: {
        flexGrow: '1',
        paddingRight: '2rem',
    },
    number: {
    },
};

const FilterLabel = (props) => {
    return (
        <div className={props.classes.labelContainer}>
            <div className={props.classes.text}>{props.text}</div>
            <div className={props.classes.number}>{props.number}</div>
        </div>
    );
}

export default withStyles(styles)(FilterLabel);