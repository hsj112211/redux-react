import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = ({ component: Component, isAuthenticated, ...children }) => {

    if( sessionStorage.getItem("auth") && sessionStorage.getItem("auth") !=='' ) {
        return <Route {...children} render={props => <Component {...props} /> } />;
      } else {
        alert("로그인 후 시도해주세요.")
        return <Redirect to="/login" />
      }
}

export default PrivateRoute;