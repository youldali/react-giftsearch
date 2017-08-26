//@flow

import type { GiftCollection, Dispatch, DisplayType, RouterMatch } from 'modules/actions/types';
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { selectors } from 'modules/gift-search/index';
import * as actions from 'modules/actions/giftListSearchFetch';
import { incrementPage } from 'modules/actions/giftListSearchSorting';
import GiftListCards from './listCards';
import GiftListItems from './listItems';
import ListLazyload from 'routes/common/behavior/lazyLoadingForList';
import Loader from 'routes/common/loader';
import { ErrorLoading, ErrorNoResults } from 'routes/common/error';

type GiftListContainerProps = {
  fetchList: Function,
  incrementPage: Function,
  giftCollectionToDisplay: GiftCollection,
  fullGiftCollection: GiftCollection,
  currentPage: number,
  displayAs: DisplayType,
  match: RouterMatch,
  isFetching: boolean,
  hasFetchSucceeded: boolean
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

  componentWillReceiveProps(nextProps: GiftListContainerProps){
    if(this.props.match.params.universe !== nextProps.match.params.universe)
      this.fetchList(nextProps.match.params.universe);
  }  

  fetchList(universe: string){
    this.props.fetchList(universe);
  }

  render(){
    //gift List to render
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

    //Component to render
    let component = null;
    if(this.props.isFetching)
      component = <Loader /> ;

    else if(!this.props.hasFetchSucceeded)
      component = <ErrorLoading actionRetry={() => {console.log('click'); this.props.fetchList(this.props.match.params.universe);} } /> ;

    else if(this.props.fullGiftCollection.length === 0)
      component = <ErrorNoResults /> ;  

    else
      component = 
        <ListLazyload 
          onBottomReached={this.props.incrementPage}
          numberOfItemsDisplayed={this.props.giftCollectionToDisplay.length}
          numberOfItems={this.props.fullGiftCollection.length}
          currentPage={this.props.currentPage}
          offsetBottomDetection={offsetBottomDetection}
        >
          {giftList}
        </ListLazyload> ;

  	return (
      <div>
      {component}
      </div>
  	);
  }
}


//store Connection
type OwnProps = { match: RouterMatch };
const mapStateToProps = (state: Object, ownProps: OwnProps): Object => {
	const giftCollectionToDisplay = selectors.getPaginatedOrderedFilteredList(state);
  const fullGiftCollection = selectors.getOrderedFilteredList(state);
  const currentPage = selectors.getPage(state);
  const displayAs = selectors.getDisplay(state);
  const isFetching = selectors.isFetching(state);
  const hasFetchSucceeded = selectors.hasFetchSucceeded(state);
  const {match} = ownProps;

	return {
		giftCollectionToDisplay,
    fullGiftCollection,
    currentPage,
    displayAs,
    isFetching,
    hasFetchSucceeded,
    match
	}
}

const mapDispatchToProps = (dispatch: Dispatch): Object => {
	return {
		fetchList: (universe: string) => dispatch(actions.fetchGiftList(universe)),
    incrementPage: () => dispatch(incrementPage())
	}
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(GiftListContainer));