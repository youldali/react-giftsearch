//@flow

import type { GiftCollection, Dispatch, DisplayType } from 'modules/actions/types';
import { connect } from 'react-redux';
import React, { PureComponent } from 'react';
import { selectors } from 'modules/gift-search/index';
import * as actions from 'modules/actions/giftListSearchFetch';
import { incrementPage } from 'modules/actions/giftListSearchSorting';
import GiftListCards from './listCards';
import GiftListItems from './listItems';
import { withRouter } from 'react-router-dom';
import ListLazyload from '../../common/behavior/lazyLoadingForList';

type GiftListContainerProps = {
  fetchList: Function,
  incrementPage: Function,
  giftCollectionToDisplay: GiftCollection,
  fullGiftCollection: GiftCollection,
  currentPage: number,
  displayAs: DisplayType
};

export
class GiftListContainer extends PureComponent{
	props: GiftListContainerProps;

	constructor(props: GiftListContainerProps) {
    super(props)
  }

  componentDidMount() {
    this.fetchList(this.props.match.params.universe);
  }

  componentWillReceiveProps(nextProps: ListLazyLoadProps){
    console.log(nextProps.match.params)
    if(this.props.match.params.universe !== nextProps.match.params.universe)
      this.fetchList(nextProps.match.params.universe);
  }  

  fetchList(universe){
    this.props.fetchList(universe);
  }

  render(){
    let giftList = null;
    let offsetBottomDetection = 0;
    switch(this.props.displayAs){
      case 'card':
        offsetBottomDetection = 200;
        giftList = <GiftListCards giftCollection={this.props.giftCollectionToDisplay} />
        break;
      case 'list':
      default:
        giftList = <GiftListItems giftCollection={this.props.giftCollectionToDisplay} />
    }

  	return (
      <ListLazyload 
        onBottomReached={this.props.incrementPage}
        numberOfItemsDisplayed={this.props.giftCollectionToDisplay.length}
        numberOfItems={this.props.fullGiftCollection.length}
        currentPage={this.props.currentPage}
        offsetBottomDetection={offsetBottomDetection}
      >
        {giftList}
      </ListLazyload>
  	);
  }
}


//store Connection
const mapStateToProps = (state: Object): Object => {
	const giftCollectionToDisplay = selectors.getPaginatedOrderedFilteredList(state);
  const fullGiftCollection = selectors.getOrderedFilteredList(state);
  const currentPage = selectors.getPage(state);
  const displayAs = selectors.getDisplay(state);
	return {
		giftCollectionToDisplay,
    fullGiftCollection,
    currentPage,
    displayAs
	}
}

const mapDispatchToProps = (dispatch: Dispatch): Object => {
	return {
		fetchList: (universe: string) => dispatch(actions.fetchGiftList(universe)),
    incrementPage: () => dispatch(incrementPage())
	}
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(GiftListContainer));