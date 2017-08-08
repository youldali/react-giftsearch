import React, { Component } from 'react'
import { Visibility } from 'semantic-ui-react'


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
          bottomVisible: false,
          fits: false,
          passing: false,
          onScreen: false,
          offScreen: false,
        }
      }
    }

    handleUpdate = (e, { calculations }) => this.setState({ calculations })

    render() {
      const { calculations } = this.state

      return (
        <Visibility onUpdate={this.handleUpdate}>
          <WrappedComponent {...this.props} />
        </Visibility>
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