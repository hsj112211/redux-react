import React from 'react';
import { Link, Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import Home from './Home';
import Menu from './Menu';
import MenuDetail from './MenuDetail';
import Login from './Login';
import LineLoginCallback from './LineLoginCallback';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';
import {  useSelector } from 'react-redux';
import Query from './Query';

function App() {
  const user = useSelector(state => state.user);
  return (
    <Router>
        <Link to="/login">
          <button>로그인</button>
        </Link>
        <Link to="/">
          <button>Home</button>
        </Link>
        <Link to="/menu">
          <button>Menu</button>
        </Link>
        <Link to="/query">
          <button>Query</button>
        </Link>
      <hr />
        <Switch>
          <PrivateRoute exact path="/" isAuthenticated={user.isAuth} component={Home} />
          <PrivateRoute exact path="/menu" isAuthenticated={user.isAuth} component={Menu} />
          <PrivateRoute exact path="/menu/:id" isAuthenticated={user.isAuth} component={MenuDetail} />
          <PrivateRoute exact path="/query" isAuthenticated={user.isAuth} component={Query} />
          <PublicRoute exact path="/login" isAuthenticated={user.isAuth} component={Login} />
        </Switch>
        <Route path="/auth/line/callback" component={LineLoginCallback} />
    </Router>
  );
}

export default App;
