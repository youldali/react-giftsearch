
import React from 'react';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Sort from '@material-ui/icons/Sort';
import MenuButton from './menuButton';

class OrderByMenu extends React.Component {
  state = {
    anchorEl: null,
  };

  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  render() {
    const { anchorEl } = this.state;

    return (
      <React.Fragment>
        <MenuButton 
          text='Trier par' 
          onClick={this.handleClick}
          icon={<Sort />}
        />
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={this.handleClose}
        >
          <MenuItem onClick={this.handleClose}>Prix ASC</MenuItem>
          <MenuItem onClick={this.handleClose}>Prix DESC</MenuItem>
        </Menu>
      </React.Fragment>
    );
  }
}

export default OrderByMenu;