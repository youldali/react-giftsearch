import React, { Component } from 'react';
import { Provider } from 'react-redux';
import configureStore from './configureStore';
import App from './routes/App';
import { MuiThemeProvider } from 'material-ui/styles';

const store = configureStore();

export default class Root extends Component {
  render() {
    return (
      <Provider store={store}>
      	<MuiThemeProvider>
        	<App />
        </MuiThemeProvider>
      </Provider>
    )
  }
}