//@flow

import type { GiftCollection } from 'modules/actions/types';
import { connect } from 'react-redux';
import React, { Component } from 'react';
import { selectors } from 'modules/gift-search/index';
import * as actions from 'modules/actions/giftListSearchFetch';
import GiftListCards from './giftListCards';
import GiftListItems from './giftListItems';

import makeVisible from '../../common/hoc/lazyLoadingForList';

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
    const VisibleGiftList = makeVisible(GiftListItems);
  	//console.log(this.props.giftList);
  	return (
  		<VisibleGiftList giftCollection={this.props.giftCollection} />
  	);
  }
}


//store Connection
const mapStateToProps = (state) => {
	const giftCollection = selectors.getPaginatedOrderedFilteredList(state);
	return {
		giftCollection
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		fetchList: () => dispatch(actions.fetchGiftList('gastronomy'))
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(GiftListContainer);