//@flow

import { connect } from 'react-redux';
import React, { Component } from 'react';
import { selectors } from 'modules/gift-search/index';
import * as actions from 'modules/actions/giftListSearchSorting';
import { Radio } from 'semantic-ui-react';


export
const Filter = (props) => {

  const handleChange = () => {
    if(props.filterState === props.filterForValue)
      props.resetFilters([props.filterName]);
    else
      props.setFilters( {[props.filterName]: props.filterForValue } );
  }  

  return (
    <div>
      <Radio 
        toggle 
        label={props.filterLabel} 
        checked={props.filterState === props.filterForValue}
        onChange={handleChange}
      />
    </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(Filter);