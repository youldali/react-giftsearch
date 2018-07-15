//@flow
import type { FilterBlockConfig, FilterStructure } from 'modules/boxSearch/types';

import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import FilterLabel from './filterLabel';

const styles = {
    filterGroup: {
        marginTop: '2rem',
    },

    filterLabel: {
        width: '100%',
    },
};

type FilterBlockProps = {
    filterBlockConfig: FilterBlockConfig,
    filterStructureList: FilterStructure[],
    classes: Object
}


const FilterBlock = (props: FilterBlockProps) => {
    const {classes, filterBlockConfig, filterStructureList} = props;
    return (
        <FormGroup classes={{root: classes.filterGroup}}>
            <Typography variant="subheading" gutterBottom>{filterBlockConfig['label']}</Typography>
            {filterStructureList.map(filterStructure => 
                <FormControlLabel
                    key={filterStructure.filterName}
                    control={
                        <Checkbox
                        checked={false}
                        onChange={() => {}}
                        value=""
                        />
                    }
                    label={<FilterLabel text={filterStructure.label} number={100} />}
                    classes={{label: classes.filterLabel}}
                />
            )}
            <Divider />
        </FormGroup>
    );
}

export default withStyles(styles)(FilterBlock);