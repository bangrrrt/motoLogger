import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { reducer as formReducer } from 'redux-form';
import thunk from 'redux-thunk';

import appReducer from './reducer';
import logScreenReducer from '../screens/logScreen/state/reducer';
import registerScreenReducer from '../screens/registerScreen/state/reducer';
import loginScreenReducer from '../screens/loginScreen/state/reducer';
import garageScreenReducer from '../screens/garageScreen/state/reducer';

const reducer = combineReducers({
  app: appReducer,
  logScreen: logScreenReducer,
  registerScreen: registerScreenReducer,
  loginScreen: loginScreenReducer,
  garageScreen: garageScreenReducer,
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
