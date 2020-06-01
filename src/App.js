import React from 'react';
import './App.css';

import 'antd/dist/antd.css';
import Home from './containers/Home/index';

import LoginPage from './containers/Auth/screens/LoginPage';
import { Switch, Route, Redirect } from 'react-router-dom';
import PageNotFound from './components/PageNotFound';

function App() {
  return (
    <div>
      <Switch>
        <Route path="/home">
          <Home></Home>
        </Route>
        <Route exact path="/">
          <LoginPage></LoginPage>
        </Route>
        <Route path="/404PageNotFound">
          <PageNotFound></PageNotFound>
        </Route>
        <Redirect from="*" to="/404PageNotFound" />
      </Switch>
      ;
    </div>
  );
}

export default App;
