import React, { Component } from 'react';
import { Visibility } from 'semantic-ui-react';

function isElementInViewport (el) {

    var rect = el.getBoundingClientRect();

    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) && /*or $(window).height() */
        rect.right <= (window.innerWidth || document.documentElement.clientWidth) /*or $(window).width() */
    );
}

function isBottomReached (el) {

    var rect = el.getBoundingClientRect();
    return (
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight)
    );
}


export default
(WrappedComponent) => {

  return class extends Component {
    constructor(props) {
      super(props)
      this.state={
        calculations: {
          height: 0,
          width: 0,
          topPassed: false,
          bottomPassed: false,
          pixelsPassed: 0,
          percentagePassed: 0,
          topVisible: false,
          bottomVisible: true,
          fits: false,
          passing: false,
          onScreen: false,
          offScreen: false,
        }
      }

      this.test = this.test.bind(this);
      this.handleRef = this.handleRef.bind(this);
      console.log(this.props.fullGiftCollection.length, this.props.giftCollection.length);
    }

    handleRef(contextRef){
      this.contextRef = contextRef;
    }

    componentDidUpdate(){
      this.test()
    }
    componentDidMount(){
      this.test();
      window.addEventListener("scroll", this.test);
    }
    componentWillUnmount(){
      window.removeEventListener("scroll", this.test);
    }
    componentWillReceiveProps(nextProps){
      //this.test()
    }
    test(){
      if(this.contextRef != null && isBottomReached(this.contextRef) && this.props.giftCollection.length < this.props.fullGiftCollection.length && this.props.giftCollection.length > 0){
        console.log(this.props.giftCollection.length);
        this.props.incrementPage();
        //console.log('test');
      }
      // var i =1;
      // console.log(this.props.giftCollection.length);
      // while(this.props.giftCollection.length > 0 && this.props.giftCollection.length < 10 && i < 10){
      //   this.props.incrementPage();
      //   console.log('increment');
      //   i++;
      // }
    }

    render() {
      const { calculations } = this.state

      return (
        <div ref={this.handleRef}>
          <WrappedComponent {...this.props} />
        </div>
      )
    }
  }
}


//store Connection

/*
const mapDispatchToProps = (dispatch) => {
  return {
    setPage: () => dispatch(actions.fetchGiftList('gastronomy'))
  }
}

export default connect(null, mapDispatchToProps)(GiftListContainer);*/