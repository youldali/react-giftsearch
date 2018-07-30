//@flow

import type { BoxCollection, Dispatch, DisplayType, RouterMatch } from 'modules/actions/types';
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { selectors } from 'modules/boxSearch/index';
import { fetchBoxList, incrementPage } from 'modules/actions/boxSearch';
import BoxCardList, {BoxCardListPlaceholder} from './boxCardList';
import ListLazyload from 'routes/common/behavior/lazyLoadingForList';
import { ErrorLoading, ErrorNoResults } from 'routes/common/error';

type BoxListContainerProps = {
  fetchBoxList: Function,
  incrementPage: Function,
  boxList: BoxCollection,
  currentPage: number,
  displayAs: DisplayType,
  match: RouterMatch,
  isFetching: boolean,
  hasFetchSucceeded: boolean,
  numberOfMatchingBoxes: number,
};

export
class BoxListContainer extends PureComponent<BoxListContainerProps>{

  componentDidMount() {
    this.props.fetchBoxList();
  }

  render(){
    //box List to render
    let boxList = null;
    let offsetBottomDetection = 0;
    switch(this.props.displayAs){
      case 'card':
        offsetBottomDetection = 200;
        boxList = <BoxCardList boxCollection={this.props.boxList} />
        break;
      case 'list':
      default:
        boxList = <BoxCardList boxCollection={this.props.boxList} />
    }

    //Component to render
    let component = null;
    if(this.props.isFetching && this.props.currentPage === 1)
      component = <BoxCardListPlaceholder /> ;

    else if(!this.props.hasFetchSucceeded)
      component = <ErrorLoading actionRetry={() => this.props.fetchBoxList() } /> ;

    else if(this.props.boxList.length === 0)
      component = <ErrorNoResults /> ;  

    else
      component = 
        <ListLazyload 
          onBottomReached={this.props.incrementPage}
          numberOfItemsDisplayed={this.props.boxList.length}
          numberOfItems={this.props.numberOfMatchingBoxes}
          currentPage={this.props.currentPage}
          offsetBottomDetection={offsetBottomDetection}
          isFetching={this.props.isFetching}
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
    hasFetchSucceeded = selectors.boxListSelectors.hasFetchSucceeded(state),
    numberOfMatchingBoxes = selectors.boxesStatisticsSelectors.getNumberOfMatchingBoxes(state);

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
    match,
    numberOfMatchingBoxes,
	}
}

const mapDispatchToProps = (dispatch: Dispatch): Object => {
	return {
		fetchBoxList: () => dispatch(fetchBoxList()),
    incrementPage: () => dispatch(incrementPage())
	}
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(BoxListContainer));