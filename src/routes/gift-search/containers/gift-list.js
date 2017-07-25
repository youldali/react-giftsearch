//@flow

import { connect } from 'react-redux';
import React, { Component } from 'react';
import { selectors } from 'modules/gift-search/index';
import * as actions from 'modules/actions/gift-list-fetch';
import GiftList from '../components/gift-list';

class GiftListContainer extends Component{
	giftList: Array<Object>;

	constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.props.fetchList();
  }

  render(){
  	//console.log(this.props.giftList);
  	return (
  		<GiftList giftList={this.props.giftList} />
  	);
  }
}

const mapStateToProps = (state) => {
	const giftList = selectors.getOrderedFilteredList(state);
	return {
		giftList
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		fetchList: () => dispatch(actions.fetchGiftList('adventure'))
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(GiftListContainer);