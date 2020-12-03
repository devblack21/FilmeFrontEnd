import {createStore, applyMiddleware, compose} from 'redux';
import createSagaMiddleware from 'redux-saga';
import reducers from './reducers';
import sagas from './sagas';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?? compose;

const sagaMiddleware = createSagaMiddleware({
  onError: error => console.error(error),
});
const store = createStore(reducers,
    composeEnhancers(
        applyMiddleware(sagaMiddleware),
    ));
sagaMiddleware.run(sagas);

export default store;
