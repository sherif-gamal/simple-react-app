import {createStore, applyMiddleware} from 'redux';
import createSagaMiddleware from 'redux-saga';
import {routerMiddleware} from 'react-router-redux';
import reducers from './reducers';
import mySaga from './sagas';

export default function configureStore(initialState = {}, history) {
  const sagaMiddleware = createSagaMiddleware();
  const historyMiddleware = routerMiddleware(history);

  const middlewares = [sagaMiddleware, historyMiddleware];

  const store = createStore(reducers, applyMiddleware(...middlewares));
  sagaMiddleware.run(mySaga);
  return store;
}
