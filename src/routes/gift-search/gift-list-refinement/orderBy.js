//@flow

import { connect } from 'react-redux';
import React from 'react';
import { selectors } from 'modules/gift-search/index';
import {setOrder as setOrderAction} from 'modules/actions/giftListSearchSorting';
import { Dropdown, Icon } from 'semantic-ui-react';

import type { Dispatch } from 'modules/actions/types';

type OrderByDropdownProps = {
  setOrderBy: Function,
  orderBy: string
};

export
const OrderByDropdown = (props: OrderByDropdownProps) => {
  const handleChange = (e: SyntheticEvent<HTMLElement>, data: Object) => {
  	if(data.value !== props.orderBy)
  	 props.setOrderBy(data.value);
  };
 
  const orderByOptions = [
	  {
	    text: <span>Prix<Icon name='chevron up' /></span>,
	    value: 'rawPrice',
	  },
		{
	    text: <span>Prix<Icon name='chevron down' /></span>,
	    value: '-rawPrice',
	  },
		{
	    text: <span>Nom<Icon name='chevron up' /></span>,
	    value: 'name',
	  },
		{
	    text: <span>Nom<Icon name='chevron down' /></span>,
	    value: '-name',
	  },
	  {
	    text: <span>Pertinence</span>,
	    value: 'auto',
	    disabled: true
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
      	value={props.orderBy}
      	onChange={handleChange}
      	style={{background: '#49769c', color: '#FFF'}}
      />
     </div>
  );  
};

//Store connection
const mapStateToProps = (state: Object): Object => {
  const orderState = selectors.getOrder(state);
  const orderBy = Array.isArray(orderState) ? 'auto' : orderState;
	return {
		orderBy,
	}
}

const mapDispatchToProps = (dispatch: Dispatch): Object => {
	return {
		setOrderBy: (orderBy: string) => dispatch(setOrderAction(orderBy)),
	}
}

export default
connect(mapStateToProps, mapDispatchToProps)(OrderByDropdown);
