//@flow
import type { Dispatch, State } from 'modules/actions/types';

import React from 'react';
import { connect } from 'react-redux';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Sort from '@material-ui/icons/Sort';
import MenuButton from './menuButton';
import { selectors } from 'modules/boxSearch/index';
import { setOrderBy } from 'modules/actions/boxSearch';

type OrderByMenuState = {
    anchorEl: ?HTMLElement,
};

type OrderByMenuProps = {
    orderByState: string,
    setOrderByState: Function,
};

class OrderByMenu extends React.PureComponent<OrderByMenuProps, OrderByMenuState> {
  state = {
    anchorEl: null,
  };

  handleClick = (event: SyntheticEvent<HTMLButtonElement>) => {
    this.setState({ anchorEl: event.currentTarget });
  }

  handleClose = () => {
    this.setState({ anchorEl: null });
  }

  handleMenuItemClick(event, orderBy){
      this.props.setOrderByState(orderBy);
      this.handleClose();
  }

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
            <MenuItem 
                onClick={event => this.handleMenuItemClick(event, 'price')}
                selected={this.props.orderByState === 'price'}
            >
                Prix ASC
            </MenuItem>
            <MenuItem 
                onClick={event => this.handleMenuItemClick(event, '-price')}
                selected={this.props.orderByState === '-price'}
            >
                Prix DESC
            </MenuItem>
        </Menu>
      </React.Fragment>
    );
  }
}


//Store connection
const mapStateToProps = (state: State): Object => {
  const orderByState = selectors.orderBySelectors.getOrderBy(state);
	return {
		orderByState,
	}
}

const mapDispatchToProps = (dispatch: Dispatch): Object => (
    {
		setOrderByState: (orderBy: string) => dispatch(setOrderBy(orderBy)),
	}
)

export default
connect(mapStateToProps, mapDispatchToProps)(OrderByMenu);
