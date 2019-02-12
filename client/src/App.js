import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';

import AppRouterContainer from './appRouterContainer';
import store from './state/store';

import './App.css';

const App = () => {
  return (
    <Router>
      <Provider store={store}>
        <div className="App">
          <AppRouterContainer />
        </div>
      </Provider>
    </Router>
  );
};

export default App;
