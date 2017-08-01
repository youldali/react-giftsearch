//@flow

import type { GiftCollection } from 'modules/actions/types';
import { connect } from 'react-redux';
import React, { Component } from 'react';
import { selectors } from 'modules/gift-search/index';
import * as actions from 'modules/actions/giftListSearchFetch';
import GiftListCards from './giftListCards';
import GiftListItems from './giftListItems';

export
class GiftListContainer extends Component{
	giftCollection: GiftCollection;

	constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.props.fetchList();
  }

  render(){
  	//console.log(this.props.giftList);
  	return (
  		<GiftListItems giftCollection={this.props.giftCollection} />
  	);
  }
}


//store Connection
const mapStateToProps = (state) => {
	const giftCollection = selectors.getOrderedFilteredList(state);
	return {
		giftCollection
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		fetchList: () => dispatch(actions.fetchGiftList('adventure'))
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(GiftListContainer);