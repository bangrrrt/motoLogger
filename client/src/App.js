import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import store from './state/store';
import HomeScreen from './screens/homeScreen/homeScreen';
import LogScreenContainer from './screens/logScreen/logScreenContainer';

import './App.css';

const App = () => (
  <Router>
    <Provider store={store}>
      <div className="App">
        <Route exact path="/" component={HomeScreen} />
        <Route path="/home" component={HomeScreen} />
        {/* <NavBarContainer /> */}
        <Route path="/logs" component={LogScreenContainer} />
        <Route path="/login" component={HomeScreen} />
        <Route path="/register" component={HomeScreen} />
        {/* <FooterContainer /> */}
      </div>
    </Provider>
  </Router>
);

export default App;
