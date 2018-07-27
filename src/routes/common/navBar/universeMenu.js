//@flow
import type { Dispatch, State } from 'modules/actions/types';

import React from 'react';
import { connect } from 'react-redux';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Swap from '@material-ui/icons/SwapHoriz';
import MenuButton from './menuButton';
import { selectors as routerModuleSelectors } from 'modules/router/index';
import { push } from 'connected-react-router'


type UniverseMenuState = {
  anchorEl: ?HTMLElement,
};

type UniverseMenuProps = {
    routerPathName: string,
    pushRoute: Function,
};
class UniverseMenu extends React.Component<UniverseMenuProps, UniverseMenuState> {
  state = {
    anchorEl: null,
  };

  handleClick = (event: SyntheticEvent<HTMLButtonElement>) => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleMenuItemClick = (route: string) => {
    this.props.pushRoute(route);
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
          <MenuItem 
            onClick={() => this.handleMenuItemClick('/box-search/sejour')}
            selected={this.props.routerPathName === '/box-search/sejour'}
          >
            Séjour
          </MenuItem>
          <MenuItem 
            onClick={() => this.handleMenuItemClick('/box-search/mock-1000')}
            selected={this.props.routerPathName === '/box-search/mock-1000'}
          >
            Test 1000 boxes
          </MenuItem>
        </Menu>
      </React.Fragment>
    );
  }
}

//Store connection
const mapStateToProps = (state: State): Object => {
  const routerPathName = routerModuleSelectors.routerSelectors.getPathName(state);
	return {
		routerPathName,
	}
};

const mapDispatchToProps = (dispatch: Dispatch): Object => (
	{
		pushRoute: (route: string) => dispatch(push(route)),
	}
);

export default
connect(mapStateToProps, mapDispatchToProps)(UniverseMenu);
