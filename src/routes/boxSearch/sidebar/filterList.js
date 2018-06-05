
import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import Typography from '@material-ui/core/Typography';
import { config, helpers } from 'modules/boxSearch';
import {compose} from 'ramda';
import { withRouter } from 'react-router'
import FilterBlock from './filterBlock';

const {filterBlockConfig, filterConfig} = config;

const styles = {
    filterList: {
         padding: '0 2rem',
         marginTop: '2rem',
    },
};

class FilterListContainer extends React.Component {
    constructor(props){
        console.log(props);
        super(props);
        const universe = props.match.params.universe;

        this.state = {filterStructureByFilterGroup: [], filterBlockConfig: filterBlockConfig[universe]};
        this.getFilterStructureByFilterGroup(universe).then( filterStructureByFilterGroup => this.setState({filterStructureByFilterGroup}));
    }

    getFilterStructureByFilterGroup(universe){
        return helpers.getFilterStructureByFilterGroup(universe, filterConfig[universe]);
    }

    componentDidUpdate(prevProps){
        const 
            universe = this.props.match.params.universe,
            prevUniverse = prevProps.match.params.universe;

        if(universe !== prevUniverse){
            this.setState({filterBlockConfig: filterBlockConfig[universe]});
            this.getFilterStructureByFilterGroup(universe).then( filterStructureByFilterGroup => this.setState({filterStructureByFilterGroup}));
        }
    }
  
    render() {
        return (
            <FilterList 
                filterBlockConfig={this.state.filterBlockConfig}
                filterStructureByFilterGroup={this.state.filterStructureByFilterGroup}
                {...this.props}
            />
        );
    }
  }



const FilterList = (props) => {
    const {filterStructureByFilterGroup, filterBlockConfig} = props;

    const filterBlocksComponents = [];
    filterStructureByFilterGroup.forEach( (filterStructureList, filterGroup) => {
        filterBlocksComponents.push(
            <FilterBlock
                key={filterGroup}
                filterGroupConfig={filterBlockConfig.get(filterGroup)} 
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

export default compose(withStyles(styles), withRouter)(FilterListContainer);