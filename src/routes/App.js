//@flow

import React, { Component } from 'react';
import './App.css';
import injectTapEventPlugin from 'react-tap-event-plugin';
import GiftSearchContainer from './gift-search/';


// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

class App extends Component {
  render() {
    return (
      <div className="App">
        <GiftSearchContainer />
      </div>
    );
  }
}

export default App;
