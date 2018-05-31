
import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { filterConfig, getFilterStructureMap } from 'modules/boxSearch';


const styles = {
  button: {
    height: '100%',
  },
};



class FilterList extends React.Component {
  constructor(props){
    super(props);
    this.state = {filterMap: {}};
    getFilterStructureMap('sejour', filterConfig['sejour']).then(filterStructure => this.setState({filterMap: filterStructure}));
  }

  render() {
    const {filterMap} = this.state;
    console.log(filterMap);
    return (
      <FormControl component="fieldset">
        <FormLabel component="legend">Assign responsibility</FormLabel>
          {Object.values(filterMap).map( filter => 
            <FormControlLabel
              key={filter.filterName}
              control={
                <Checkbox
                  checked={false}
                  onChange={() => {}}
                  value=""
                />
              }
              label={filter.filterName}
            />
          )}
      </FormControl>
    );
  }
}


export default withStyles(styles)(FilterList);