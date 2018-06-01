import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import FilterListIcon from '@material-ui/icons/FilterList';
import MenuButton from './menuButton';
import FilterList from './filterList';
class FilterMenu extends React.Component {
    state = {
      isDrawerOpen: false,
    };
  
    toggleDrawer = (open) => () => {
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