//@flow

import type { BoxCollection, Dispatch, DisplayType, RouterMatch } from 'modules/actions/types';
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { selectors } from 'modules/boxSearch/index';
import * as actions from 'modules/actions/boxSearch';
import BoxListCards from './boxCards';
import ListLazyload from 'routes/common/behavior/lazyLoadingForList';
import Loader from 'routes/common/loader';
import { ErrorLoading, ErrorNoResults } from 'routes/common/error';

type GiftListContainerProps = {
  fetchList: Function,
  incrementPage: Function,
  boxList: BoxCollection,
  currentPage: number,
  displayAs: DisplayType,
  match: RouterMatch,
  isFetching: boolean,
  hasFetchSucceeded: boolean
};

export
class GiftListContainer extends PureComponent<GiftListContainerProps>{

  componentDidMount() {
    this.props.fetchList();(this.props.match.params.universe);
  }

  componentWillReceiveProps(nextProps: GiftListContainerProps){
    if(this.props.match.params.universe !== nextProps.match.params.universe)
      nextProps.fetchList();
  }  

  render(){
    //gift List to render
    let boxList = null;
    let offsetBottomDetection = 0;
    switch(this.props.displayAs){
      case 'card':
        offsetBottomDetection = 200;
        boxList = <BoxListCards boxCollection={this.props.boxList} />
        break;
      case 'list':
      default:
        boxList = <BoxListCards boxCollection={this.props.boxList} />
    }

    //Component to render
    let component = null;
    if(this.props.isFetching)
      component = <Loader /> ;

    else if(!this.props.hasFetchSucceeded)
      component = <ErrorLoading actionRetry={() => {this.props.fetchList(this.props.match.params.universe);} } /> ;

    else if(this.props.boxList.length === 0)
      component = <ErrorNoResults /> ;  

    else
      component = 
        <ListLazyload 
          onBottomReached={this.props.incrementPage}
          numberOfItemsDisplayed={this.props.boxList.length}
          numberOfItems={1000}
          currentPage={this.props.currentPage}
          offsetBottomDetection={offsetBottomDetection}
        >
          {boxList}
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
  const 
    boxList = selectors.boxListSelectors.getList(state),
    isFetching = selectors.boxListSelectors.isFetching(state),
    hasFetchSucceeded = selectors.boxListSelectors.hasFetchSucceeded(state);

  const 
    currentPage = selectors.pageSelectors.getPage(state),
    displayAs = selectors.displayBySelectors.getDisplay(state),
    {match} = ownProps;

	return {
    boxList,
    isFetching,
    hasFetchSucceeded,
    currentPage,
    displayAs,
    match
	}
}

const mapDispatchToProps = (dispatch: Dispatch): Object => {
	return {
		fetchList: () => dispatch(actions.fetchBoxListAction),
    incrementPage: () => dispatch(actions.incrementPage())
	}
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(GiftListContainer));