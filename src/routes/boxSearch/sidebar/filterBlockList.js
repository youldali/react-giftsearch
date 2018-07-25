//@flow
import type { FilterStructureByFilterGroup, FilterBlockConfigByFilterGroup } from 'modules/boxSearch/types';
import type { RouterMatch, State } from 'modules/actions/types';

import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import Typography from '@material-ui/core/Typography';
import { config, helpers } from 'modules/boxSearch';
import { withRouter } from 'react-router'
import FilterBlock from './filterBlock';
import { selectors } from 'modules/boxSearch/index';
import { compose } from 'ramda';


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
    filterList: {
         padding: '0 .5rem',
         marginTop: '2rem',
    },

    filterNavTitle: {
        color: '#9E9E9E',
        fontWeight: 'normal',
        marginBottom: '.3rem',
    
    },

    filterNavSubTitle: {
        color: '#757575',
    },
};

type FilterBlockListProps = {
    classes: Object,
    filterStructureByFilterGroup: FilterStructureByFilterGroup,
    filterBlockConfigByBlockName: ProxyObject<FilterBlockConfigByFilterGroup>,
    numberOfMatchingBoxes: number,
    totalNumberOfBoxes: number,
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
        <FormControl component="fieldset" className={props.classes.filterList}>
            <FormLabel component="legend">
                <Typography variant="title" classes={{root: classes.filterNavTitle}}>Filtres</Typography>
                <Typography classes={{root: classes.filterNavSubTitle}} variant="Subheading">
                    {props.numberOfMatchingBoxes === props.totalNumberOfBoxes
                    ? <React.Fragment>{props.totalNumberOfBoxes} coffrets </React.Fragment>
                    : <React.Fragment>{props.numberOfMatchingBoxes} coffrets correspondant sur {props.totalNumberOfBoxes}</React.Fragment>
                    }
                </Typography>
 
            </FormLabel>
            {filterBlocksComponents}
        </FormControl>
    );
}


const mapStateToProps = (state: State): Object => {
    const 
        numberOfMatchingBoxes = selectors.boxesStatisticsSelectors.getNumberOfMatchingBoxes(state),
        totalNumberOfBoxes = selectors.boxesStatisticsSelectors.getTotalNumberOfBoxes(state);

	return {
        numberOfMatchingBoxes,
        totalNumberOfBoxes,
    }
}
const FilterBlockList = compose(connect(mapStateToProps), withStyles(styles))(_FilterBlockList);