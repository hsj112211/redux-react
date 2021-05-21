import React, { useEffect } from 'react';
import { Route } from 'react-router-dom';

const PublicRoute = ({ component: Component, isAuthenticated, ...children }) => {
    return (
        <Route
            render={props => (<Component {...props} {...children} /> )}
        />
    )
}

export default PublicRoute;