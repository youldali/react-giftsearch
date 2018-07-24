//@flow
import type { Dispatch, State } from 'modules/actions/types';

import React from 'react';
import { connect } from 'react-redux';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Swap from '@material-ui/icons/SwapHoriz';
import { withStyles } from '@material-ui/core/styles';
import MenuButton from './menuButton';
import { Link } from "react-router-dom";
import { selectors } from 'modules/boxSearch/index';

const linkStyle = {
  link: {
    color: 'black',
    textDecoration: 'none',
  }
}

type StyledLinkProps = {
  classes: Object,
};

const 
  _StyledLink = (props: StyledLinkProps) => <Link {...props} className={props.classes.link}></Link>,
  StyledLink = withStyles(linkStyle)(_StyledLink);


type UniverseMenuState = {
  anchorEl: ?HTMLElement,
};

type UniverseMenuProps = {
    routerPathName: string,
};
class UniverseMenu extends React.Component<UniverseMenuProps, UniverseMenuState> {
  state = {
    anchorEl: null,
  };

  handleClick = (event: SyntheticEvent<HTMLButtonElement>) => {
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
          <MenuItem 
            onClick={this.handleClose}
            selected={this.props.routerPathName === '/box-search/sejour'}
          >
            <StyledLink to="/box-search/sejour">Séjour</StyledLink>
          </MenuItem>
          <MenuItem 
            onClick={this.handleClose}
            selected={this.props.routerPathName === '/box-search/mock-1000'}
          >
            <StyledLink to="/box-search/mock-1000">Test 1000 boxes</StyledLink>
          </MenuItem>
        </Menu>
      </React.Fragment>
    );
  }
}

//Store connection
const mapStateToProps = (state: State): Object => {
  const routerPathName = selectors.routerSelectors.getPathName(state);
	return {
		routerPathName,
	}
};

export default
connect(mapStateToProps)(UniverseMenu);
