//@flow

import type { GiftCollection } from 'modules/actions/types';
import { connect } from 'react-redux';
import React, { Component } from 'react';
import { selectors } from 'modules/gift-search/index';
import * as actions from 'modules/actions/giftListSearchFetch';
import { incrementPage } from 'modules/actions/giftListSearchSorting';
import GiftListCards from './giftListCards';
import GiftListItems from './giftListItems';

import ListLazyload from '../../common/helpers/lazyLoadingForList';

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
  	return (
      <ListLazyload 
        onBottomReached={this.props.incrementPage}
        numberOfItemsDisplayed={this.props.giftCollectionToDisplay.length}
        numberOfItems={this.props.fullGiftCollection.length}
      >
        <GiftListItems giftCollection={this.props.giftCollectionToDisplay} />
      </ListLazyload>
  	);
  }
}


//store Connection
const mapStateToProps = (state) => {
	const giftCollectionToDisplay = selectors.getPaginatedOrderedFilteredList(state);
  const fullGiftCollection = selectors.getOrderedFilteredList(state);
	return {
		giftCollectionToDisplay,
    fullGiftCollection
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		fetchList: () => dispatch(actions.fetchGiftList('gastronomy')),
    incrementPage: () => dispatch(incrementPage())
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(GiftListContainer);