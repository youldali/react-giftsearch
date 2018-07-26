//@flow
import type { FilterStructureByFilterGroup, FilterBlockConfigByFilterGroup } from 'modules/boxSearch/types';
import type { Dispatch, RouterMatch, State } from 'modules/actions/types';

import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import Typography from '@material-ui/core/Typography';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import grey from '@material-ui/core/colors/grey';
import { config, helpers } from 'modules/boxSearch';
import { withRouter } from 'react-router'
import FilterBlock from './filterBlock';
import { selectors } from 'modules/boxSearch/index';
import { compose } from 'ramda';
import Button from '@material-ui/core/Button';
import { resetAllAppliedFilters } from 'modules/actions/boxSearch';

const {filterBlockConfig, filterConfig} = config;

type FilterBlockListContainerProps = {
    match: RouterMatch,
};

type FilterBlockListContainerState = {
    filterStructureByFilterGroup: FilterStructureByFilterGroup,
    filterBlockConfigByBlockName: ProxyObject<FilterBlockConfigByFilterGroup>
}

class FilterBlockListContainer extends PureComponent<FilterBlockListContainerProps, FilterBlockListContainerState> {
    constructor(props){
        super(props);
        const universe = props.match.params.universe;

        this.state = {filterStructureByFilterGroup: new Map(), filterBlockConfigByBlockName: filterBlockConfig[universe]};
        this.getFilterStructureByFilterGroup(universe)
            .then( filterStructureByFilterGroup => this.setState({filterStructureByFilterGroup}));
    }

    getFilterStructureByFilterGroup(universe){
        return helpers.getFilterStructureByFilterGroup(universe, filterConfig[universe]);
    }

    componentDidUpdate(prevProps){
        const 
            universe = this.props.match.params.universe,
            prevUniverse = prevProps.match.params.universe;

        if(universe !== prevUniverse){
            this.setState({filterBlockConfigByBlockName: filterBlockConfig[universe]});
            this.getFilterStructureByFilterGroup(universe)
                .then( filterStructureByFilterGroup => this.setState({filterStructureByFilterGroup}));
        }
    }
  
    render() {
        return (
            <FilterBlockList 
                filterBlockConfigByBlockName={this.state.filterBlockConfigByBlockName}
                filterStructureByFilterGroup={this.state.filterStructureByFilterGroup}
                {...this.props}
            />
        );
    }
}
export default withRouter(FilterBlockListContainer);


const styles = {
    appBar: {
        padding: '10px 24px',
        alignItems: 'center',
        flexDirection: 'row',
    },

    filterNavTitle: {
        color: grey[200],
        fontWeight: 'normal',
        marginBottom: '.3rem',
    
    },

    filterNavSubTitle: {
        color: grey[300],
        flexGrow: 1,
        padding: '.5rem 0',
    },

    filterList: {
         marginTop: '1rem',
         width: '100%',
    },
};

type FilterBlockListProps = {
    classes: Object,
    filterStructureByFilterGroup: FilterStructureByFilterGroup,
    filterBlockConfigByBlockName: ProxyObject<FilterBlockConfigByFilterGroup>,
    numberOfMatchingBoxes: number,
    totalNumberOfBoxes: number,
    numberOfFiltersApplied: number,
    resetAllAppliedFilters: Function
};

const _FilterBlockList = (props: FilterBlockListProps) => {
    const {filterStructureByFilterGroup, filterBlockConfigByBlockName, classes} = props;

    const filterBlocksComponents = [];
    filterStructureByFilterGroup.forEach( (filterStructureList, filterGroup) => {
        filterBlocksComponents.push(
            <FilterBlock
                key={filterGroup}
                filterBlockConfig={filterBlockConfigByBlockName.get(filterGroup)} 
                filterStructureList={filterStructureList}
            />
        );
    });

    return (
        <React.Fragment>
            <AppBar position='sticky' classes={{root: classes.appBar}}>
                <Typography classes={{root: classes.filterNavSubTitle}} variant="subheading">
                    {props.numberOfMatchingBoxes === props.totalNumberOfBoxes
                    ? <React.Fragment>{props.totalNumberOfBoxes} coffrets </React.Fragment>
                    : <React.Fragment>{props.numberOfMatchingBoxes} sur {props.totalNumberOfBoxes} coffrets</React.Fragment>
                    }
                </Typography>

                {props.numberOfFiltersApplied > 0 &&
                    <Button
                    variant='flat'
                    color="secondary"
                    size='small'
                    onClick={props.resetAllAppliedFilters}
                    >
                        Effacer ({props.numberOfFiltersApplied})
                    </Button>
                }
            </AppBar>
            <FormControl className={props.classes.filterList}>
                {filterBlocksComponents}
            </FormControl>
        </React.Fragment>
    );
}


const mapStateToProps = (state: State): Object => {
    const 
        numberOfMatchingBoxes = selectors.boxesStatisticsSelectors.getNumberOfMatchingBoxes(state),
        totalNumberOfBoxes = selectors.boxesStatisticsSelectors.getTotalNumberOfBoxes(state),
        numberOfFiltersApplied = selectors.filtersAppliedSelectors.getNumberOfFiltersApplied(state);

	return {
        numberOfMatchingBoxes,
        totalNumberOfBoxes,
        numberOfFiltersApplied,
    }
}

const mapDispatchToProps = (dispatch: Dispatch): Object => (
	{
		resetAllAppliedFilters: () => dispatch(resetAllAppliedFilters()),
	}
);

const FilterBlockList = compose(connect(mapStateToProps, mapDispatchToProps), withStyles(styles))(_FilterBlockList);