import React, { Component } from 'react';
import { Container, Icon } from 'semantic-ui-react';
import { isElementBottomVisible } from 'helpers/DOM/visibility';
import throttle from 'lodash.throttle';

class ListLazyLoad extends Component {
  constructor(props) {
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

  componentWillUpdate(nextProps){
    if(nextProps.currentPage === 1)
      window.scrollBy(0, this.wrapperRef.getBoundingClientRect().top);
  }

  bottomReachedCallback(){
    if(!this.isUpdating && this.props.numberOfItemsDisplayed < this.props.numberOfItems && isElementBottomVisible(this.wrapperRef)){
      console.log('onBottomReached');
      this.isUpdating = true;
      setTimeout(this.props.onBottomReached, 0);
      
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