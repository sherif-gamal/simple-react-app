import { createStore, applyMiddleware, compose } from "redux";
import createSagaMiddleware from "redux-saga";
import { routerMiddleware } from "react-router-redux";
import reducers from "./reducers";
import rootSaga from "./sagas";
import { INIT } from "./constants";

export default function configureStore(history) {
  const sagaMiddleware = createSagaMiddleware();
  const historyMiddleware = routerMiddleware(history);

  const middlewares = [sagaMiddleware, historyMiddleware];
  /*eslint-disable */
  const composeSetup = process.env.NODE_ENV !== 'production' && typeof window === 'object' &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : compose
  /* eslint-enable */

  const token = localStorage.getItem("token");
  const store = createStore(
    reducers,
    composeSetup(applyMiddleware(...middlewares))
  );
  sagaMiddleware.run(rootSaga);
  store.dispatch({ type: INIT, payload: token });
  return store;
}
