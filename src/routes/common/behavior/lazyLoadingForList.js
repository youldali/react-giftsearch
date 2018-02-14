//@flow

import type {Element} from 'react';
import React, { PureComponent } from 'react';
import Loader from 'routes/common/loader';
import { isElementBottomVisible } from 'helpers/DOM/visibility';
//import throttle from 'lodash.throttle';

type ListLazyLoadProps = {
  currentPage: number,
  onBottomReached: Function,
  numberOfItemsDisplayed: number,
  numberOfItems: number,
  children: Element<any>,
  offsetBottomDetection: ?number
};

class ListLazyLoad extends PureComponent<ListLazyLoadProps> {
  props: ListLazyLoadProps;
  hasScrollEventListener: boolean;
  isUpdating: boolean;
  wrapperRef: HTMLElement | null;

  constructor(props: ListLazyLoadProps) {
    super(props);
    ((this:any)).bottomReachedCallback = this.bottomReachedCallback.bind(this);
    this.hasScrollEventListener = false;
    this.isUpdating = false;
  }
  
  componentDidMount(){
    this.bottomReachedCallback();
    this.addScrollEventListener();
  }

  componentWillUnmount(){
    this.removeScrollEventListener();
  }

  componentDidUpdate(){
    if(this.props.numberOfItemsDisplayed >= this.props.numberOfItems)
      this.removeScrollEventListener()
    else
      this.addScrollEventListener();

    this.isUpdating = false;
    this.bottomReachedCallback();
  }

  componentWillUpdate(nextProps: ListLazyLoadProps){
    if(!this.wrapperRef)
      return;

    const wrappedRefTopPosition = this.wrapperRef.getBoundingClientRect().top;
    if(nextProps.currentPage === 1 && wrappedRefTopPosition < 0)
      window.scrollBy(0, wrappedRefTopPosition);
  }

  bottomReachedCallback(){
    if(!this.isUpdating 
        && this.wrapperRef
        && this.props.numberOfItemsDisplayed < this.props.numberOfItems 
        && isElementBottomVisible(this.props.offsetBottomDetection, this.wrapperRef)
      ){
      this.isUpdating = true;
      this.props.onBottomReached();
    }
  }

  addScrollEventListener(){
    if(!this.hasScrollEventListener && this.props.numberOfItemsDisplayed < this.props.numberOfItems){
      window.addEventListener("scroll", this.bottomReachedCallback);
      this.hasScrollEventListener = true;
    }
  }

  removeScrollEventListener(){
    if(this.hasScrollEventListener){
      window.removeEventListener("scroll", this.bottomReachedCallback);
      this.hasScrollEventListener = false;
    }
  }  

  render() {
    return (
      <div>
        <div ref={(wrapperRef) => { this.wrapperRef = wrapperRef; }}>
          {this.props.children}
        </div>

        {this.props.numberOfItemsDisplayed < this.props.numberOfItems && 
          <Loader />
        }
      </div>
    )
  }
  
}

export default ListLazyLoad;