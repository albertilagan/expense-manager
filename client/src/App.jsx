import React from 'react';
import { BrowserRouter, Route, Redirect } from 'react-router-dom';
import { Provider } from 'react-redux';
import Expenses from './pages/Expenses/Expenses';
import Categories from './pages/Categories/Categories';
import Report from './pages/Report/Report';
import store from './store/';
import './App.scss';

import { library } from '@fortawesome/fontawesome-svg-core'
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
library.add(faEdit, faTrash);

const App = () => {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <div id="main-container">
          <Route exact path="/" render={() => <Redirect to="/expenses" />} />
          <Route path="/expenses" component={Expenses} />
          <Route path="/categories" component={Categories} />
          <Route path="/report" component={Report} />
        </div>
      </Provider>
    </BrowserRouter>
  );
}

export default App;