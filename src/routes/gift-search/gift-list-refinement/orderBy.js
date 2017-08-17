//@flow

import { connect } from 'react-redux';
import React, { PureComponent } from 'react';
import { selectors } from 'modules/gift-search/index';
import {setOrder as setOrderAction} from 'modules/actions/giftListSearchSorting';
import { Dropdown, Icon } from 'semantic-ui-react';

import type { Dispatch } from 'modules/actions/types';

type OrderByDropdownProps = {
  setOrderBy: Function,
  orderState: string
};

export
const OrderByDropdown = (props: OrderByDropdownProps) => {
  const handleChange = (e: SyntheticEvent, data: Object) => {
   props.setOrderBy(data.value);
  };
 
  const orderByOptions = [
	  {
	    text: <span><Icon name='chevron up' /> Prix</span>,
	    value: 'rawPrice',
	  },
		{
	    text: <span><Icon name='chevron down' /> Prix</span>,
	    value: '-rawPrice',
	  },
		{
	    text: <span><Icon name='chevron up' /> Nom</span>,
	    value: 'name',
	  },
		{
	    text: <span><Icon name='chevron down' /> Nom</span>,
	    value: '-name',
	  },	  	  
  ];
  return (
  	<div>
      <Dropdown 
      	placeholder='Trier par'
      	labeled 
      	button
      	icon='filter'
      	className='icon'
      	options={orderByOptions}
      	value={props.orderState}
      	onChange={handleChange}
      />
     </div>
  );  
};

//Store connection
const mapStateToProps = (state: Object): Object => {
  const orderState = selectors.getOrder(state);
	return {
		orderState,
	}
}

const mapDispatchToProps = (dispatch: Dispatch): Object => {
	return {
		setOrderBy: (orderBy: string) => dispatch(setOrderAction(orderBy)),
	}
}

export default
connect(mapStateToProps, mapDispatchToProps)(OrderByDropdown);
