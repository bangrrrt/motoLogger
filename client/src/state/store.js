import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { reducer as formReducer } from 'redux-form';
import thunk from 'redux-thunk';

import appReducer from './reducer';
import logScreenReducer from '../screens/logScreen/state/reducer';
import homeScreenReducer from '../screens/homeScreen/state/reducer';

const reducer = combineReducers({
  app: appReducer,
  homeScreen: homeScreenReducer,
  logScreen: logScreenReducer,
  form: formReducer
});

const showDevTools = typeof window !== 'undefined'
  ? (window.devToolsExtension && process.env.NODE_ENV !== 'production')
  : false;

const store = (createStore)(
  reducer,
  compose(
    applyMiddleware(thunk),
    showDevTools ? window.devToolsExtension() : f => f
  )
);

export default store;
