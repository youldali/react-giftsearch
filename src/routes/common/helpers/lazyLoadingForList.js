import React, { Component } from 'react';
import { Container, Icon } from 'semantic-ui-react';
import { isElementBottomVisible } from 'helpers/DOM/visibility';
import throttle from 'lodash.throttle';

class ListLazyLoad extends Component {
  constructor(props) {
    super(props)
    this.bottomReachedCallback = this.bottomReachedCallback.bind(this);
    this.hasScrollEventListener = false;
  }
  
  componentDidMount(){
    this.bottomReachedCallback();
    this.addScrollEventListener();
  }

  componentWillUnmount(){
    this.removeScrollEventListener();
  }

  componentDidUpdate(){
    console.log('a', this.props.numberOfItems);
    if(this.props.numberOfItemsDisplayed >= this.props.numberOfItems)
      this.removeScrollEventListener()
    else
      this.addScrollEventListener();

    this.bottomReachedCallback();
  }

  bottomReachedCallback(){
    console.log(this.props.numberOfItemsDisplayed, this.props.numberOfItems);
    if(this.props.numberOfItemsDisplayed < this.props.numberOfItems && isElementBottomVisible(this.wrapperRef)){
      this.props.onBottomReached();
    }
  }

  addScrollEventListener(){
    if(!this.hasScrollEventListener && this.props.numberOfItemsDisplayed < this.props.numberOfItems){
      window.addEventListener("scroll", throttle(this.bottomReachedCallback, 30));
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