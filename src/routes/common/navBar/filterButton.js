//@flow

import React from 'react';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import FilterListIcon from '@material-ui/icons/FilterList';
import MenuButton from './menuButton';
import FilterList from '../../boxSearch/sidebar/filterBlockList';
import { withStyles } from '@material-ui/core/styles';

type FilterMenuState = {
    isDrawerOpen: boolean
};

type FilterMenuProps = {
    classes: Object
};

const styles = {
    drawer: {
        width: '100vw',
        maxWidth: '300px',
    }
}
class FilterMenu extends React.Component<FilterMenuProps, FilterMenuState> {
    state = {
      isDrawerOpen: false,
    };
  
    toggleDrawer = (open: boolean) => () => {
        this.setState({
            isDrawerOpen: open,
        });
    };
  
    render() {
        const {classes} = this.props;
        return (
            <React.Fragment>
                <MenuButton 
                    text="Filtrer"
                    onClick={this.toggleDrawer(true)}
                    icon={<FilterListIcon />}
                />
                <SwipeableDrawer 
                    anchor="right"  
                    open={this.state.isDrawerOpen} 
                    onClose={this.toggleDrawer(false)}
                    classes={{paper: classes.drawer}}
                    >
                    <div tabIndex={0} role="button"><FilterList /></div>
                </SwipeableDrawer>
            </React.Fragment>
        );
    }
  }
  
  export default withStyles(styles)(FilterMenu);