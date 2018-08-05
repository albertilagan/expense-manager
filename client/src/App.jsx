import React from 'react';
import { BrowserRouter, Route, Redirect } from 'react-router-dom';
import { Provider } from 'react-redux';
import Expenses from './pages/Expenses/Expenses';
import Categories from './pages/Categories/Categories';
import store from './store/';
import './App.scss';

const App = () => {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <div id="main-container" className="bg-dark">
          <Route exact path="/" render={() => <Redirect to="/expenses" />} />
          <Route path="/expenses" component={Expenses} />
          <Route path="/categories" component={Categories} />
        </div>
      </Provider>
    </BrowserRouter>
  );
}

export default App;