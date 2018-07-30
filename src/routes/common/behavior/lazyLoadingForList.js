//@flow

import type {Element} from 'react';
import React, { PureComponent } from 'react';
import LinearProgress from '@material-ui/core/LinearProgress';
import { withStyles } from '@material-ui/core/styles';
import { isElementBottomVisible } from 'helpers/DOM/visibility';
//import throttle from 'lodash.throttle';


const styles = {
  linearProgress: {
    width: '50%',
    margin: '1rem auto',
  }
}


type ListLazyLoadProps = {
  currentPage: number,
  onBottomReached: Function,
  numberOfItemsDisplayed: number,
  numberOfItems: number,
  children: Element<any>,
  offsetBottomDetection: ?number,
  isFetching: boolean,
  classes: Object,
};

class ListLazyLoad extends PureComponent<ListLazyLoadProps> {
  hasScrollEventListener: boolean;
  wrapperRef: HTMLElement | null;

  constructor(props: ListLazyLoadProps) {
    super(props);
    ((this:any)).bottomReachedCallback = this.bottomReachedCallback.bind(this);
    this.hasScrollEventListener = false;
  }
  
  componentDidMount(){
    this.bottomReachedCallback();
    this.addScrollEventListener();
  }

  componentWillUnmount(){
    this.removeScrollEventListener();
  }

  componentDidUpdate(prevProps: ListLazyLoadProps){
    if(this.props.numberOfItemsDisplayed >= this.props.numberOfItems)
      this.removeScrollEventListener()
    else
      this.addScrollEventListener();

    this.bottomReachedCallback();


    if(!this.wrapperRef)
      return;

    const wrappedRefTopPosition = this.wrapperRef.getBoundingClientRect().top;
    if(this.props.currentPage === 1 && wrappedRefTopPosition < 0)
      window.scrollBy(0, wrappedRefTopPosition);
  }

  bottomReachedCallback(){
    if(!this.props.isFetching
        && this.wrapperRef
        && this.props.numberOfItemsDisplayed < this.props.numberOfItems 
        && isElementBottomVisible(this.props.offsetBottomDetection, this.wrapperRef)
      ){
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
          <LinearProgress classes={{root: this.props.classes.linearProgress}} />
        }
      </div>
    )
  }
  
}

export default withStyles(styles)(ListLazyLoad);