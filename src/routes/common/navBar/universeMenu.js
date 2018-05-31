
import React from 'react';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Swap from '@material-ui/icons/SwapHoriz';
import { withRouter } from 'react-router-dom';
import MenuButton from './menuButton';

//{location}: {location: RouterLocation}

class UniverseMenu extends React.Component {
  state = {
    anchorEl: null,
  };

  constructor(props){
    super(props);
  }

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
          text="Changer d'univers"
          onClick={this.handleClick}
          icon={<Swap />}
        />

        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={this.handleClose}
        >
          <MenuItem onClick={this.handleClose}>Séjour</MenuItem>
          <MenuItem onClick={this.handleClose}>Gastronomie</MenuItem>
          <MenuItem onClick={this.handleClose}>test 1000 boxes</MenuItem>
        </Menu>
      </React.Fragment>
    );
  }
}

export default UniverseMenu;