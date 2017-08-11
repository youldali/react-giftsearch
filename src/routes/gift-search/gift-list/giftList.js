//@flow

import type { GiftCollection } from 'modules/actions/types';
import { connect } from 'react-redux';
import React, { Component } from 'react';
import { selectors } from 'modules/gift-search/index';
import * as actions from 'modules/actions/giftListSearchFetch';
import { incrementPage } from 'modules/actions/giftListSearchSorting';
import GiftListCards from './listCards';
import GiftListItems from './listItems';

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
        currentPage={this.props.currentPage}
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
  const currentPage = selectors.getPage(state);
	return {
		giftCollectionToDisplay,
    fullGiftCollection,
    currentPage
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		fetchList: () => dispatch(actions.fetchGiftList('gastronomy')),
    incrementPage: () => dispatch(incrementPage())
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(GiftListContainer);