import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

import store from './state/store';
import NavBarContainer from './components/navBar/navBarContainer';
import FooterContainer from './components/footer/footerContainer';
import LogScreenContainer from './screens/logScreen/logScreenContainer';
import RegisterScreen from './screens/registerScreen/registerScreen';
import LoginScreen from './screens/loginScreen/loginScreen';

import './App.css';

const App = () => (
  <Router>
    <Provider store={store}>
      <div className="App">
        <NavBarContainer />
        <Route exact path="/" component={LogScreenContainer} />
        <Route path="/logs" component={LogScreenContainer} />
        <Route path="/login" component={LoginScreen} />
        <Route path="/register" component={RegisterScreen} />
        <FooterContainer />
      </div>
    </Provider>
  </Router>
);

export default App;
