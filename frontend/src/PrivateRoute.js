import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect, Route } from 'react-router';

const PrivateRoute = ({ component: Component, person, ...rest }) => {
  const { isLoggedIn, role } = useSelector((state) => state.user);
  const auth = person ? person === role : true;

  return <Route {...rest} render={(props) => (!isLoggedIn ? <Redirect to="/login" /> : auth ? <Component {...props} /> : <h1>Page not found</h1>)} />;
};

export default PrivateRoute;
