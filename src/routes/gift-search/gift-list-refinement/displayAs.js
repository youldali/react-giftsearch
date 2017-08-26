//@flow

import { connect } from 'react-redux';
import React, { PureComponent } from 'react';
import { selectors } from 'modules/gift-search/index';
import {setDisplay as setDisplayAction} from 'modules/actions/giftListSearchSorting';
import { Icon, Button } from 'semantic-ui-react';

import type { Dispatch, DisplayType } from 'modules/actions/types';

type DisplayAsProps = {
  setDisplayAs: Function,
  isActive: boolean,
  value: DisplayType,
  icon: string
};

export
const DisplayAs = (props: DisplayAsProps) => {
  const handleChange = () => {
   props.setDisplayAs(props.value);
  };
 
  return (
  	<Button 
  		icon={props.icon} 
  		onClick={handleChange}
  		disabled={props.isActive}
      color='instagram'
  	/>
  );  
};

//Store connection
type OwnProps = {
	value: DisplayType,
	icon: string
};
const mapStateToProps = (state: Object, ownProps: OwnProps): Object => {
  const displayState = selectors.getDisplay(state);
  const isActive = ownProps.value === displayState;
	return {
		displayState,
		isActive,
		value: ownProps.value,
		icon: ownProps.icon
	}
}

const mapDispatchToProps = (dispatch: Dispatch): Object => {
	return {
		setDisplayAs: (displayAs: DisplayType) => dispatch(setDisplayAction(displayAs)),
	}
}

export default
connect(mapStateToProps, mapDispatchToProps)(DisplayAs);
