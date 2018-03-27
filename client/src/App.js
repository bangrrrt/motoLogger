import React from 'react';
import { Provider } from 'react-redux';

import store from './state/store';
import NavBarContainer from './components/navBar/navBarContainer';
import FooterContainer from './components/footer/footerContainer';
import LogScreenContainer from './screens/logScreen/logScreenContainer';

import './App.css';

const App = () => (
  <Provider store={store}>
    <div className="App">
      <NavBarContainer />
      <LogScreenContainer />
      <FooterContainer />
    </div>
  </Provider>
);

export default App;
