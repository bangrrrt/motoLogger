import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { reducer as formReducer } from 'redux-form';
import thunk from 'redux-thunk';

import appReducer from './reducer';
import logScreenReducer from '../screens/logScreen/state/reducer';
import homeScreenReducer from '../screens/homeScreen/state/reducer';
import registerScreenReducer from '../screens/registerScreen/state/reducer';
import loginScreenReducer from '../screens/loginScreen/state/reducer';
import garageScreenReducer from '../screens/garageScreen/state/reducer';

const reducer = combineReducers({
  app: appReducer,
  homeScreen: homeScreenReducer,
  logScreen: logScreenReducer,
  registerScreen: registerScreenReducer,
  loginScreen: loginScreenReducer,
  garageScreen: garageScreenReducer,
  form: formReducer
});

const showDevTools = typeof window !== 'undefined'
  ? (window.__REDUX_DEVTOOLS_EXTENSION__ && process.env.NODE_ENV !== 'production')
  : false;

const store = (createStore)(
  reducer,
  compose(
    applyMiddleware(thunk),
    showDevTools ? window.__REDUX_DEVTOOLS_EXTENSION__() : f => f
  )
);

export default store;
