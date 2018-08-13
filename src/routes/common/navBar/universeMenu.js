//@flow
import type { Dispatch, State } from 'modules/actions/types';

import React from 'react';
import { connect } from 'react-redux';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Swap from '@material-ui/icons/SwapHoriz';
import MenuButton from './menuButton';
import { selectors as routerModuleSelectors } from 'modules/router/index';
import { setUniverse } from 'modules/actions/boxSearch';

type UniverseMenuState = {
  anchorEl: ?HTMLElement,
};

type UniverseMenuProps = {
    currentUniverse: string,
    setUniverse: Function,
};
class UniverseMenu extends React.Component<UniverseMenuProps, UniverseMenuState> {
  state = {
    anchorEl: null,
  };

  handleClick = (event: SyntheticEvent<HTMLButtonElement>) => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleMenuItemClick = (universe: string) => {
    this.props.setUniverse(universe);
    this.handleClose();
  }

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  render() {
    const { anchorEl } = this.state;

    return (
      <React.Fragment>
        <MenuButton 
          text="Univers"
          onClick={this.handleClick}
          icon={<Swap />}
        />

        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={this.handleClose}
        >
          <MenuItem 
            onClick={() => this.handleMenuItemClick('sejour')}
            selected={this.props.currentUniverse === 'sejour'}
          >
            Séjour
          </MenuItem>
          <MenuItem 
            onClick={() => this.handleMenuItemClick('mock-1000')}
            selected={this.props.currentUniverse === 'mock-1000'}
          >
            Test 1000 boxes
          </MenuItem>
          <MenuItem 
            onClick={() => this.handleMenuItemClick('mock-5000')}
            selected={this.props.currentUniverse === 'mock-5000'}
          >
            Test 5000 boxes
          </MenuItem>
          <MenuItem 
            onClick={() => this.handleMenuItemClick('mock-10000')}
            selected={this.props.currentUniverse === 'mock-10000'}
          >
            Test 10000 boxes
          </MenuItem>
        </Menu>
      </React.Fragment>
    );
  }
}

//Store connection
const mapStateToProps = (state: State): Object => {
  const currentUniverse = routerModuleSelectors.routerSelectors.getUniverse(state);
	return {
		currentUniverse,
	}
};

const mapDispatchToProps = (dispatch: Dispatch): Object => (
	{
		setUniverse: (universe: string) => dispatch(setUniverse(universe)),
	}
);

export default
connect(mapStateToProps, mapDispatchToProps)(UniverseMenu);
