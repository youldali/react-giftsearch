import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import rootReducer from './modules/rootReducer';
import { connectRouter, routerMiddleware } from 'connected-react-router'
import { createBrowserHistory } from 'history';

export
const history = createBrowserHistory();

export default function configureStore(preloadedState) {
	const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

	return createStore(
    connectRouter(history)(rootReducer),
    preloadedState,
    composeEnhancers(
	    applyMiddleware(
			 routerMiddleware(history),
	   	 thunkMiddleware,
	    )
	  )
  ) 
};