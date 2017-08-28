import React, { PureComponent } from 'react';
import { Provider } from 'react-redux';
import configureStore from './configureStore';
import App from './routes/App';
import {BrowserRouter as Router} from 'react-router-dom'

const store = configureStore();

export default class Root extends PureComponent {
  render() {
    return (
      <Provider store={store}>
      	<Router>
      		<App />
        </Router>
      </Provider>
    )
  }
}