import React, { PureComponent } from 'react';
import { Provider } from 'react-redux';
import configureStore, { history } from './configureStore';
import App from './routes/App';
import { ConnectedRouter } from 'connected-react-router'

const store = configureStore();

export default class Root extends PureComponent {
  render() {
    return (
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <App />
        </ConnectedRouter>
      </Provider>
    )
  }
}