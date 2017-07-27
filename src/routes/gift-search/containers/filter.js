//@flow

import { connect } from 'react-redux';
import React, { Component } from 'react';
import { selectors } from 'modules/gift-search/index';
import * as actions from 'modules/actions/gift-list-refinement';
import Filter from '../components/filter';


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
		setFilter: (filters) => dispatch(actions.setFilter(filters)),
		resetFilter: (filters) => dispatch(actions.resetFilter(filters))
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Filter);