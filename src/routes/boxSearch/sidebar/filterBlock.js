//@flow
import type { Dispatch, FiltersApplied, State } from 'modules/actions/types';
import type { FilterBlockConfig, FilterStatisticSimplified, FilterStructure } from 'modules/boxSearch/types';

import React from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import FilterLabel from './filterLabel';
import { compose } from 'ramda';
import { selectors } from 'modules/boxSearch/index';
import { setAppliedFilters, resetAppliedFilters, resetAllAppliedFilters } from 'modules/actions/boxSearch';

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
    classes: Object,
    filtersAppliedState: FiltersApplied,
    filtersStatisticsState: FilterStatisticSimplified,
    setAppliedFilters: Function,
	resetAppliedFilters: Function,
	resetAllAppliedFilters: Function,
}


const FilterBlock = (props: FilterBlockProps) => {
    const {classes, filterBlockConfig, filterStructureList} = props;

    const onFilterClick = (event, filterName, filterOperand, isFilterChecked) => {
        isFilterChecked ? props.resetAppliedFilters([filterName]) : props.setAppliedFilters({[filterName]: filterOperand});
    };

    return (
        <FormGroup classes={{root: classes.filterGroup}}>
            <Typography variant="subheading" gutterBottom>{filterBlockConfig['label']}</Typography>
            {filterStructureList.map(filterStructure => {
                const 
                    isFilterChecked = props.filtersAppliedState[filterStructure.filterName] !== undefined,
                    filterStatistic = props.filtersStatisticsState[filterStructure.filterName],
                    filterNumber = !filterStatistic ? '0'
                                    : filterStatistic.type === 'absolute' ? filterStatistic.number : `+ ${filterStatistic.number}`;
                return (
                    <FormControlLabel
                        key={filterStructure.filterName}
                        control={
                            <Checkbox
                            checked={isFilterChecked}
                            onChange={event => onFilterClick(event, filterStructure.filterName, filterStructure.operand, isFilterChecked)}
                            value=""
                            />
                        }
                        label={<FilterLabel text={filterStructure.label} filterNumber={filterNumber} />}
                        classes={{label: classes.filterLabel}}
                    />
                )}
            )}
            <Divider />
        </FormGroup>
    );
}


//Store connection
const mapStateToProps = (state: State): Object => {
    const 
        filtersAppliedState = selectors.filtersAppliedSelectors.getAllAppliedFilters(state),
        filtersStatisticsState = selectors.boxesStatisticsSelectors.getFiltersStatistics(state);

	return {
        filtersAppliedState,
        filtersStatisticsState
    }
}

const mapDispatchToProps = (dispatch: Dispatch): Object => {
	return {
		setAppliedFilters: (filters: FiltersApplied) => dispatch(setAppliedFilters(filters)),
		resetAppliedFilters: (filters: Array<string>) => dispatch(resetAppliedFilters(filters)),
		resetAllAppliedFilters: () => dispatch(resetAllAppliedFilters()),
	}
}

export default compose(connect(mapStateToProps, mapDispatchToProps), withStyles(styles))(FilterBlock);