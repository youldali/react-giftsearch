//@flow

import React from 'react';
import './App.css';
import injectTapEventPlugin from 'react-tap-event-plugin';
import GiftSearchModule from './gift-search/giftSearchModule';
import { Route, Switch, Redirect } from 'react-router-dom';
import { universeToUrlMap } from 'modules/gift-search/config';
import type { RouterMatch } from 'modules/actions/types';

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

const App = () => {

	const isGiftSearchUniverseValid = (universe) => {
		if(universeToUrlMap[universe] !== undefined)
			return true;

		return false;
	};

  return (
    <div className="App">
    	<Switch>
    		<Route 
    			path="/gift-search/:universe" 
    			render={( {match}: {match: RouterMatch} ) => {
    				const component = isGiftSearchUniverseValid(match.params.universe) 
    					? <GiftSearchModule /> 
    					: <Redirect to="/gift-search/gastronomy"/>;

    				return component;
    			}} 

    		/>
    		<Redirect to="/gift-search/gastronomy"/>
    	</Switch>
    </div>
  );
}

export default App;
