//@flow

import React from 'react';
import Drawer from '@material-ui/core/Drawer';
import FilterListIcon from '@material-ui/icons/FilterList';
import MenuButton from './menuButton';
import FilterList from '../../boxSearch/sidebar/filterBlockList';

type FilterMenuState = {
    isDrawerOpen: boolean
};
class FilterMenu extends React.Component<Object, FilterMenuState> {
    state = {
      isDrawerOpen: false,
    };
  
    toggleDrawer = (open: boolean) => () => {
      this.setState({
        isDrawerOpen: open,
      });
    };
  
    render() {
  
      return (
        <React.Fragment>
          <MenuButton 
            text="Filter"
            onClick={this.toggleDrawer(true)}
            icon={<FilterListIcon />}
          />
          <Drawer anchor="right"  open={this.state.isDrawerOpen} onClose={this.toggleDrawer(false)}>
            <div
                tabIndex={0}
                role="button"
            >
              <FilterList />
            </div>
          </Drawer>
        </React.Fragment>
      );
    }
  }
  
  export default FilterMenu;