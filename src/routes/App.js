//@flow

import React from 'react';
import injectTapEventPlugin from 'react-tap-event-plugin';
import BoxSearchLayout from './boxSearch/boxSearchLayout';
import { Route, Switch, Redirect } from 'react-router-dom';
import type { RouterMatch } from 'modules/actions/types';

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

const App = () => {

	const isGiftSearchUniverseValid = (universe) => {
		return true;
		/*
		if(universeToUrlMap[universe] !== undefined)
			return true;

		return false;
		*/
	};

  return (
    <div className="App">
    	<Switch>
    		<Route 
    			path="/gift-search/:universe" 
    			render={( {match}: {match: RouterMatch} ) => {
    				const component = isGiftSearchUniverseValid(match.params.universe) 
    					? <BoxSearchLayout /> 
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
