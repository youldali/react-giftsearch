//@flow

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

type FilterLabelProps = {
    classes: Object,
    filterNumber: string,
    text: string,
};

const FilterLabel = (props: FilterLabelProps) => {
    return (
        <div className={props.classes.labelContainer}>
            <div className={props.classes.text}>{props.text}</div>
            <div className={props.classes.number}>{props.filterNumber}</div>
        </div>
    );
}

export default withStyles(styles)(FilterLabel);