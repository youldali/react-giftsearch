//@flow

import React, { PureComponent } from 'react';
import { Container, Icon } from 'semantic-ui-react';
import { isElementBottomVisible } from 'helpers/DOM/visibility';
import throttle from 'lodash.throttle';

type ListLazyLoadProps = {
  currentPage: number,
  onBottomReached: Function,
  numberOfItemsDisplayed: number,
  numberOfItems: number,
  children: React.Element<*>,
  offsetBottomDetection: ?number
};

class ListLazyLoad extends PureComponent {
  props: ListLazyLoadProps;
  hasScrollEventListener: boolean;
  isUpdating: boolean;
  wrapperRef: HTMLElement;

  constructor(props: ListLazyLoadProps) {
    super(props)
    this.bottomReachedCallback = this.bottomReachedCallback.bind(this);
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
    if(nextProps.currentPage === 1)
      window.scrollBy(0, this.wrapperRef.getBoundingClientRect().top);
  }

  bottomReachedCallback(){
    if(!this.isUpdating 
        && this.props.numberOfItemsDisplayed < this.props.numberOfItems 
        && isElementBottomVisible(this.wrapperRef, this.props.offsetBottomDetection )
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
          <Container textAlign='center'>
            <Icon 
              loading 
              name='spinner'
              size='huge'
              color='blue'
             />
         </Container>
        }
      </div>
    )
  }
  
}

export default ListLazyLoad;