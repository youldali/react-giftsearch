//@flow

import { connect } from 'react-redux';
import React, { Component } from 'react';
import { selectors } from 'modules/gift-search/index';
import * as actions from 'modules/actions/giftListSearchSorting';
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
		setFilters: (filters) => dispatch(actions.setFilters(filters)),
		resetFilters: (filters) => dispatch(actions.resetFilters(filters))
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Filter);