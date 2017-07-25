//@flow

import { connect } from 'react-redux';
import React, { Component } from 'react';
import { selectors } from 'modules/gift-search/index';
import * as actions from 'modules/actions/gift-list-fetch';
import Filter from '../components/filter';


const mapStateToProps = (state, ownProps) => {
	const filter = selectors.getFilter(ownProps.filterName);
	return {
		filterName
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		setFilter: (filters) => dispatch(actions.setFilter(filters)),
		resetFilter: (filters) => dispatch(actions.resetFilter(filters))
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(GiftListContainer);