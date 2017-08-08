//@flow

import React, { Component } from 'react';
import './App.css';
import injectTapEventPlugin from 'react-tap-event-plugin';
import GiftSearchModule from './gift-search/giftSearchModule';


// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

class App extends Component {
  render() {
    return (
      <div className="App">
        <GiftSearchModule />
      </div>
    );
  }
}

export default App;
