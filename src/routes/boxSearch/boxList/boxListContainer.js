//@flow

import type { BoxCollection, Dispatch, DisplayType } from 'modules/actions/types';
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { selectors } from 'modules/boxSearch/index';
import { fetchBoxList, incrementPage } from 'modules/actions/boxSearch';
import BoxCardList, {BoxCardListPlaceholder} from './boxCardList';
import ListLazyload from 'routes/common/behavior/lazyLoadingForList';
import Placeholder from 'routes/common/behavior/placeholder';
import { ErrorLoading, ErrorNoResults } from 'routes/common/error';

type BoxListContainerProps = {
  fetchBoxList: Function,
  incrementPage: Function,
  boxList: BoxCollection,
  currentPage: number,
  displayAs: DisplayType,
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
    const listBoxLazyLoad = this.props.isFetching && this.props.currentPage === 1 ? null :
      <ListLazyload 
        onBottomReached={this.props.incrementPage}
        numberOfItemsDisplayed={this.props.boxList.length}
        numberOfItems={this.props.numberOfMatchingBoxes}
        currentPage={this.props.currentPage}
        offsetBottomDetection={offsetBottomDetection}
        isFetching={this.props.isFetching}
      >
        {boxList}
      </ListLazyload>;

    let component = 
    !this.props.hasFetchSucceeded ? <ErrorLoading actionRetry={() => this.props.fetchBoxList() } />
    : !this.props.isFetching && this.props.boxList.length === 0 ? <ErrorNoResults />
    : <Placeholder componentToDisplay={listBoxLazyLoad} componentPlaceholder={<BoxCardListPlaceholder />}/>;

  	return (
      <div>
      {component}
      </div>
  	);
  }
}


//store Connection
const mapStateToProps = (state: Object): Object => {
  const 
    boxList = selectors.boxListSelectors.getList(state),
    isFetching = selectors.boxListSelectors.isFetching(state),
    hasFetchSucceeded = selectors.boxListSelectors.hasFetchSucceeded(state),
    numberOfMatchingBoxes = selectors.boxesStatisticsSelectors.getNumberOfMatchingBoxes(state);

  const 
    currentPage = selectors.pageSelectors.getPage(state),
    displayAs = selectors.displayBySelectors.getDisplay(state);

	return {
    boxList,
    isFetching,
    hasFetchSucceeded,
    currentPage,
    displayAs,
    numberOfMatchingBoxes,
	}
}

const mapDispatchToProps = (dispatch: Dispatch): Object => {
	return {
		fetchBoxList: () => dispatch(fetchBoxList()),
    incrementPage: () => dispatch(incrementPage())
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(BoxListContainer);