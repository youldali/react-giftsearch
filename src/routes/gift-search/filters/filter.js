//@flow

import { connect } from 'react-redux';
import React, { Component } from 'react';
import { selectors } from 'modules/gift-search/index';
import * as actions from 'modules/actions/giftListSearchSorting';
import { Radio } from 'semantic-ui-react';
import InputRange from 'react-input-range';

export
const FilterRangeSlider = (props) => {
  const handleChange = () => props.setFilters( {[props.filterName]: props.filterForValue } );

  return (
    <InputRange
        maxValue={props.maxValue}
        minValue={0}
        value={props.filterState}
        onChangeComplete={handleChange} />
  );  
};

export
const FilterRadio = (props) => {
  const handleChange = () => {
    if(props.filterState === props.filterForValue)
      props.resetFilters([props.filterName]);
    else
      props.setFilters( {[props.filterName]: props.filterForValue } );
  }  

  return (
    <Radio 
      toggle 
      label={props.filterLabel} 
      checked={props.filterState === props.filterForValue}
      onChange={handleChange}
    />
  );  
};


//Store connection
const mapStateToProps = (state, ownProps) => {
	const {filterName} = ownProps;
	const filterState = selectors.getFilter(state, filterName);
	return {
		...ownProps,
		filterState
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		setFilters: (filters) => dispatch(actions.setFilters(filters)),
		resetFilters: (filters) => dispatch(actions.resetFilters(filters))
	}
}

export default (FilterComponent) => connect(mapStateToProps, mapDispatchToProps)(FilterComponent);