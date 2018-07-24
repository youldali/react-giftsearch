//@flow

import React from 'react';
import injectTapEventPlugin from 'react-tap-event-plugin';
import BoxSearchLayout from './boxSearch/boxSearchLayout';
import { Route, Switch, Redirect } from 'react-router-dom';
import type { RouterMatch } from 'modules/actions/types';
import universeConfig from "modules/boxSearch/config/filter.config";

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

const App = () => {

	const isBoxSearchUniverseValid = (universe) => universeConfig[universe] !== undefined

  return (
    <div className="App">
    	<Switch>
    		<Route 
    			path="/box-search/:universe" 
    			render={( {match}: {match: RouterMatch} ) => {
    				const component = isBoxSearchUniverseValid(match.params.universe) 
    					? <BoxSearchLayout /> 
    					: <Redirect to="/box-search/sejour"/>;

    				return component;
    			}} 
    		/>
    	</Switch>
    </div>
  );
}

export default App;
