import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { auth } from '../Auth';

const ProtectedRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) => {
        const redirectTo = auth.canEnter(props.location);
        return !redirectTo ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: redirectTo,
              state: { from: props.location }
            }}
          />
        );
      }
      }
    />
  );
};

export default ProtectedRoute;
