//@flow

import type { FilterStructureByFilterGroup, FilterBlockConfigByFilterGroup } from 'modules/boxSearch/types';
import type { RouterMatch } from 'modules/actions/types';

import React, { PureComponent } from 'react';
import { withStyles } from '@material-ui/core/styles';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import Typography from '@material-ui/core/Typography';
import { config, helpers } from 'modules/boxSearch';
import { withRouter } from 'react-router'
import FilterBlock from './filterBlock';

const {filterBlockConfig, filterConfig} = config;

type FilterBlockListContainerProps = {
    match: RouterMatch,
};

type FilterBlockListContainerState = {
    filterStructureByFilterGroup: FilterStructureByFilterGroup,
    filterBlockConfigByBlockName: ProxyObject<FilterBlockConfigByFilterGroup>
}

class FilterBlockListContainer extends PureComponent<FilterBlockListContainerProps, FilterBlockListContainerState>{
    constructor(props){
        console.log(props);
        super(props);
        const universe = props.match.params.universe;

        this.state = {filterStructureByFilterGroup: [], filterBlockConfigByBlockName: filterBlockConfig[universe]};
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



const styles = {
    filterList: {
         padding: '0 2rem',
         marginTop: '2rem',
    },
};

type FilterBlockListProps = {
    filterStructureByFilterGroup: FilterStructureByFilterGroup,
    filterBlockConfigByBlockName: ProxyObject<FilterBlockConfigByFilterGroup>,
    classes: Object,
};

const _FilterBlockList = (props: FilterBlockListProps) => {
    const {filterStructureByFilterGroup, filterBlockConfigByBlockName} = props;

    const filterBlocksComponents = [];
    filterStructureByFilterGroup.forEach( (filterStructureList, filterGroup) => {
        filterBlocksComponents.push(
            <FilterBlock
                key={filterGroup}
                filterGroupConfig={filterBlockConfigByBlockName.get(filterGroup)} 
                filterStructureList={filterStructureList}
            />
        );
    });

    return (
        <FormControl component="fieldset" className={props.classes.filterList}>
            <FormLabel component="legend"><Typography variant="title">Filtres</Typography></FormLabel>
            {filterBlocksComponents}
        </FormControl>
    );
}
const FilterBlockList = withStyles(styles)(_FilterBlockList);

export default withRouter(FilterBlockListContainer);