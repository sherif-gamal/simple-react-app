import {createStore, applyMiddleware} from 'redux';
import createSagaMiddleware from 'redux-saga';
import {routerMiddleware, push} from 'react-router-redux';
import reducers from './reducers';
import mySaga from './sagas';

export default function configureStore(initialState = {}, history) {
  const sagaMiddleware = createSagaMiddleware();
  const historyMiddleware = routerMiddleware(history);
  sagaMiddleware.run(mySaga);
  
  const middlewares = [sagaMiddleware, historyMiddleware];

  return createStore(reducers, applyMiddleware(...middlewares));
}
