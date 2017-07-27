import React, { Component } from 'react';
import './App.css';
import injectTapEventPlugin from 'react-tap-event-plugin';
import GiftListContainer from './gift-search/containers/gift-list';
import Filter from './gift-search/containers/filter';
// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>Welcome to React</h2>
        </div>
        
        <Filter filterLabel='Prix max' filterName='maxPrice' filterForValue={60} />
        <Filter filterLabel='Solo' filterName='forPersons' filterForValue={1} />
        <Filter filterLabel='Couple' filterName='forPersons' filterForValue={2} />
        <GiftListContainer />
      </div>
    );
  }
}

export default App;
