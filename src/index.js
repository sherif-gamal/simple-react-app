import 'babel-polyfill'; // Needed for redux-saga es6 generator support
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import createHistory from 'history/createBrowserHistory'
import 'semantic-ui-css/semantic.min.css';
import createStore from './store';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

const history = createHistory();
const store = createStore(history);
ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <App />
    </ConnectedRouter>
  </Provider>, document.getElementById('root'));
registerServiceWorker();
