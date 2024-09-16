import { createStore, applyMiddleware, compose } from 'redux';
import rootReducer from './rootReducer'; 

const composeEnhancers =
  (typeof window !== 'undefined' &&
    (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose;

const store = createStore(
  rootReducer, 
);

export default store;