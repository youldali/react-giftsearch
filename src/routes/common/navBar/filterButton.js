import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import FilterList from '@material-ui/icons/FilterList';

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
        <div>
          <Button
            aria-haspopup="true"
            onClick={this.toggleDrawer(true)}
            variant="raised" 
            color="primary"
            fullWidth={true}
          >
            <FilterList />
            Filter 
          </Button>
          <Drawer open={this.state.isDrawerOpen} onClose={this.toggleDrawer(false)}>
            <div
                tabIndex={0}
                role="button"
                onClick={this.toggleDrawer(false)}
                onKeyDown={this.toggleDrawer(false)}
            >
                element
            </div>
          </Drawer>
        </div>
      );
    }
  }
  
  export default FilterMenu;